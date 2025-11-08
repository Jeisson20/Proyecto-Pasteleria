import { useOrders } from "../context/OrdersContext.jsx";
import { useProducts } from "../context/ProductContext.jsx";

export function useObserver() {
  const { subscribe: subscribeOrders } = useOrders();
  const { subscribe: subscribeProducts } = useProducts();

  const subscribe = (callback) => {
    const unsubOrders = subscribeOrders(callback);
    const unsubProducts = subscribeProducts(callback);
    return () => {
      unsubOrders();
      unsubProducts();
    };
  };

  return { subscribe };
}
