import pool from "../db.js";
import { OrderFactory } from "../factories/OrderFactory.js";

export class OrderFacade {
    static calcularTotal(items) {
        return (items ?? []).reduce(
            (acc, i) => acc + Number(i.cantidad ?? 0) * Number(i.precio_unitario ?? 0), 0
        );
    }

    static async createOrder(data) {
        const { items } = data;

        const order = OrderFactory("pendiente", data);

        const pedidoResult = await pool.query(
            `INSERT INTO pedidos (usuario_id, estado, total)
         VALUES ($1, $2, $3)
         RETURNING id, usuario_id, estado, total, created_at`,
            [order.usuario_id, order.estado, 0]
        );

        const pedido = pedidoResult.rows[0];
        let total = 0;

        // Validate stock for each item before creating detalle and decrementing
        // --- Validaciones antes de crear el detalle del pedido ---
        // Se comprueba para cada item que:
        // 1) El producto existe.
        // 2) Tiene stock > 0.
        // 3) El stock es suficiente para la cantidad solicitada.
        // Si alguna validación falla lanzamos un Error con prefijo específico
        // (PRODUCT_NOT_FOUND, PRODUCT_OUT_OF_STOCK, INSUFFICIENT_STOCK)
        // El controlador mapeará esos errores a respuestas 4xx para el cliente.
        // Esto evita crear pedidos que dejen el inventario en negativo.
        for (const item of items) {
            const prodRes = await pool.query(`SELECT stock FROM productos WHERE id = $1`, [item.producto_id]);
            if (prodRes.rows.length === 0) {
                throw new Error(`PRODUCT_NOT_FOUND:${item.producto_id}`);
            }
            const stock = Number(prodRes.rows[0].stock ?? 0);
            if (stock <= 0) {
                throw new Error(`PRODUCT_OUT_OF_STOCK:${item.producto_id}`);
            }
            if (stock < Number(item.cantidad ?? 0)) {
                throw new Error(`INSUFFICIENT_STOCK:${item.producto_id}`);
            }

            const subtotal = item.cantidad * item.precio_unitario;
            total += subtotal;

            await pool.query(
                `INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio_unitario)
             VALUES ($1, $2, $3, $4)`,
                [pedido.id, item.producto_id, item.cantidad, item.precio_unitario]
            );

            await pool.query(
                `UPDATE productos SET stock = stock - $1 WHERE id = $2`,
                [item.cantidad, item.producto_id]
            );
        }

        const updatedPedido = await pool.query(
            `UPDATE pedidos SET total = $1 WHERE id = $2 RETURNING *`,
            [total, pedido.id]
        );

        const saved = updatedPedido.rows[0];
        return saved;
    }

    static async listOrders(user) {
        const { id: userId, rol } = user;
        const result = await pool.query(
            `SELECT
        p.id AS pedido_id,
        p.usuario_id,
        u.nombre AS cliente_nombre,
        p.estado,
        p.total,
        p.created_at,
        dp.producto_id,
        pr.nombre AS producto_nombre,
        dp.cantidad,
        dp.precio_unitario
      FROM pedidos p
      JOIN usuarios u ON p.usuario_id = u.id
      LEFT JOIN detalle_pedidos dp ON dp.pedido_id = p.id
      LEFT JOIN productos pr ON pr.id = dp.producto_id
      WHERE ($1 = 'admin' OR $1 = 'empleado' OR p.usuario_id = $2)
      ORDER BY p.created_at DESC`,
            [rol, userId]
        );

        const pedidosMap = new Map();

        result.rows.forEach(row => {
            const {
                pedido_id,
                usuario_id,
                cliente_nombre,
                estado,
                total,
                created_at,
                producto_id,
                producto_nombre,
                cantidad,
                precio_unitario,
            } = row;

            if (!pedidosMap.has(pedido_id)) {
                pedidosMap.set(pedido_id, {
                    id: pedido_id,
                    usuario_id,
                    cliente_nombre,
                    estado,
                    total,
                    fecha: created_at,
                    productos: [],
                });
            }

            const pedido = pedidosMap.get(pedido_id);
            if (producto_id) {
                pedido.productos.push({
                    id: producto_id,
                    nombre: producto_nombre,
                    cantidad,
                    precio: parseFloat(precio_unitario),
                });
            }
        });

        return Array.from(pedidosMap.values());
    }

    static async updateOrder(id, estado) {
        const result = await pool.query(
            `UPDATE pedidos SET estado = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
            [estado, id]
        );

        const updated = result.rows[0];
        return updated;
    }

    static async deleteOrder(id) {
        // --- Eliminación segura de pedido con restauración de stock ---
        // Pasos:
        // 1) Iniciamos una transacción.
        // 2) Leemos los items en `detalle_pedidos` y por cada uno incrementamos el stock
        //    en la tabla `productos` (restaurando las unidades vendidas).
        // 3) Borramos los `detalle_pedidos` del pedido y finalmente el `pedido`.
        // 4) Commit o rollback en caso de error.
        // Esto asegura que al eliminar un pedido el inventario vuelva a su estado correcto.
        try {
            await pool.query("BEGIN");

            const detallesRes = await pool.query(
                `SELECT producto_id, cantidad FROM detalle_pedidos WHERE pedido_id = $1`,
                [id]
            );

            for (const d of detallesRes.rows) {
                await pool.query(
                    `UPDATE productos SET stock = stock + $1 WHERE id = $2`,
                    [d.cantidad, d.producto_id]
                );
            }

            await pool.query(`DELETE FROM detalle_pedidos WHERE pedido_id = $1`, [id]);

            const result = await pool.query(
                `DELETE FROM pedidos WHERE id = $1 RETURNING *`,
                [id]
            );

            await pool.query("COMMIT");

            const deleted = result.rows[0];
            return deleted;
        } catch (err) {
            await pool.query("ROLLBACK");
            throw err;
        }
    }
}