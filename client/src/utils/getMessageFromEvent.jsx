export function getMessageFromEvent(event, payload) {
  switch (event) {
    case "ORDER_CREATED":
      return `✅ Nuevo pedido #${payload.id}`;
    case "ORDER_UPDATED":
      return `🔄 Pedido #${payload.id} → ${payload.estado}`;
    case "ORDER_DELETED":
      return `❌ Pedido #${payload.id} eliminado`;
    case "PRODUCT_CREATED":
      return `✅ Nuevo producto #${payload.id}`;
    case "PRODUCT_UPDATED":
      return `🔄 Producto #${payload.id} actualizado`;
    case "PRODUCT_DELETED":
      return `❌ Producto #${payload.id} eliminado`;
    default:
      return null;
  }
}
