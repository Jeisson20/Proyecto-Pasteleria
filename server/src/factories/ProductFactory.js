
// La fábrica `ProductFactory` normaliza las filas de la BD a objetos JS.
// Campos añadidos:
// - `ganancia_percent`: porcentaje de ganancia guardado en la BD.
// - `costo`: precio de costo guardado en la BD (usado para calcular ganancia en dinero).
class Product {
    constructor({ id, nombre, descripcion, precio, imagen_url, stock, ganancia_percent, costo }) {
        this.id = id ?? null;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = Number(precio ?? 0);
        this.imagen_url = imagen_url ?? null;
        this.stock = Number(stock ?? 0);
        this.ganancia_percent = Number(ganancia_percent ?? 0);
        this.costo = Number(costo ?? 0);
    }
}

export function ProductFactory(data) {
    return new Product(data);
}