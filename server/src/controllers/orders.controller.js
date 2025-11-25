import { OrderFacade } from "../facade/OrderFacade.js";

export const createOrder = async (req, res) => {

    try {
        const saved = await OrderFacade.createOrder(req.body);
        res.status(201).json(saved);
    } catch (error) {
        // Mapeo de errores lanzados desde la facade a respuestas 4xx
        // Los errores con prefijos PRODUCT_OUT_OF_STOCK, INSUFFICIENT_STOCK o
        // PRODUCT_NOT_FOUND son generados por `OrderFacade.createOrder` cuando
        // detecta problemas de inventario; devolveremos 400 para que el cliente
        // pueda mostrar un mensaje amigable al usuario.
        if (error.message && error.message.startsWith('PRODUCT_OUT_OF_STOCK')) {
            return res.status(400).json({ message: 'No se puede realizar el pedido: producto sin stock' });
        }
        if (error.message && error.message.startsWith('INSUFFICIENT_STOCK')) {
            return res.status(400).json({ message: 'No se puede realizar el pedido: stock insuficiente para uno o más productos' });
        }
        if (error.message && error.message.startsWith('PRODUCT_NOT_FOUND')) {
            return res.status(400).json({ message: 'No se puede realizar el pedido: producto no encontrado' });
        }

        res.status(500).json({ message: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const pedidos = await OrderFacade.listOrders(req.user);
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener pedidos" });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const updated = await OrderFacade.updateOrder(req.params.id, req.body.estado);
        if (!updated) return res.status(404).json({ message: "Pedido no encontrado" });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const deleted = await OrderFacade.deleteOrder(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Pedido no encontrado" });
        res.json({ message: "Pedido eliminado correctamente", pedido: deleted });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};