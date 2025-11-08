import { useEffect, useState } from "react";
import { useObserver } from "../../hook/useObserver.jsx";
import { getMessageFromEvent } from "../../utils/getMessageFromEvent.jsx";

export function NotificationCenter() {
  const { subscribe } = useObserver();
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribe((event, payload) => {
      const msg = getMessageFromEvent(event, payload);
      if (msg) {
        setMensajes((prev) => [...prev, msg]);
        setTimeout(() => {
          setMensajes((prev) => prev.slice(1));
        }, 4000);
      }
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
