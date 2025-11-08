import { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  createOrderRequest,
  getOrdersRequest,
  updateOrderRequest,
  deleteOrderRequest,
} from "../api/orders";
import { useAuth } from "../hook/useAuth";

const OrdersContext = createContext();

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
};

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  const subscribersRef = useRef([]);

  const notify = (event, payload) => {
    subscribersRef.current.forEach((fn) => fn(event, payload));
  };

  const subscribe = (fn) => {
    subscribersRef.current.push(fn);
    return () => {
      subscribersRef.current = subscribersRef.current.filter((s) => s !== fn);
    };
  };

  useEffect(() => {
    if (user?.id) {
      const saved = localStorage.getItem(`cart_${user.id}`);
      if (saved) {
        try {
          setCart(JSON.parse(saved));
        } catch (error) {
          console.error("Error al cargar el carrito:", error);
          setCart([]);
        }
      } else {
        setCart([]);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const getOrders = async () => {
    try {
      const res = await getOrdersRequest();
      setOrders(res.data);
      notify("ORDERS_LOADED", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async () => {
    try {
      const orderData = {
        usuario_id: user.id,
        items: cart.map((p) => ({
          producto_id: p.id,
          cantidad: p.cantidad,
          precio_unitario: p.precio,
        })),
      };

      const res = await createOrderRequest(orderData);
      setOrders((prev) => [res.data, ...prev]);
      clearCart();
      notify("ORDER_CREATED", res.data);
    } catch (error) {
      console.log("Error al crear pedido:", error);
    }
  };

  const updateOrder = async (id, estado) => {
    try {
      const res = await updateOrderRequest(id, { estado });
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id
            ? { ...o, estado: res.data.estado, updated_at: res.data.updated_at }
            : o
        )
      );
      notify("ORDER_UPDATED", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await deleteOrderRequest(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
      notify("ORDER_DELETED", { id });
    } catch (error) {
      console.log("Error al eliminar pedido:", error);
    }
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        getOrders,
        createOrder,
        updateOrder,
        deleteOrder,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        subscribe,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
