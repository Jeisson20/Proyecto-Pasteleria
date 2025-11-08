
class Order {
    constructor({ id, usuario_id, productos, estado, total }) {
        this.id = id ?? null;
        this.usuario_id = usuario_id;
        this.productos = productos ?? [];
        this.estado = estado;
        this.total = Number(total ?? 0);
    }
}

class PendingOrder extends Order {
    constructor(data) {
        super(data);
        this.estado = "pendiente";
    }
}

class DeliveredOrder extends Order {
    constructor(data) {
        super(data);
        this.estado = "entregado";
    }
}

export function OrderFactory(type = "pendiente", data) {
    switch (type) {
        case "entregado":
            return new DeliveredOrder(data);
        default:
            return new PendingOrder(data);
    }
}