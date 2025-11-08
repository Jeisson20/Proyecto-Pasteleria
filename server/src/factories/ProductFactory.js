
class Product {
    constructor({ id, nombre, descripcion, precio, imagen_url, stock }) {
        this.id = id ?? null;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = Number(precio ?? 0);
        this.imagen_url = imagen_url ?? null;
        this.stock = Number(stock ?? 0);
    }
}

export function ProductFactory(data) {
    return new Product(data);
}