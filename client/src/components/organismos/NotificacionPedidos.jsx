// src/components/organismos/NotificacionPedidos.jsx
import { useEffect, useState } from "react";
import { useOrders } from "../../context/OrdersContext";

export function NotificacionPedidos() {
  const { subscribe } = useOrders();
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribe((event, payload) => {
      if (event === "ORDER_CREATED") {
        setMensajes((prev) => [...prev, `✅ Nuevo pedido #${payload.id}`]);
      }
      if (event === "ORDER_UPDATED") {
        setMensajes((prev) => [
          ...prev,
          `🔄 Pedido #${payload.id} → ${payload.estado}`,
        ]);
      }
      if (event === "ORDER_DELETED") {
        setMensajes((prev) => [...prev, `❌ Pedido #${payload.id} eliminado`]);
      }

      setTimeout(() => {
        setMensajes((prev) => prev.slice(1));
      }, 4000);
    });

    return () => unsubscribe();
  }, [subscribe]);

  return (
    <div className="notificaciones">
      {mensajes.map((msg, i) => (
        <div key={i} className="notificacion">
          {msg}
        </div>
      ))}
    </div>
  );
}
