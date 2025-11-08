const subscribers = [];

export const subscribe = (fn) => {
  subscribers.push(fn);
  return () => {
    const index = subscribers.indexOf(fn);
    if (index > -1) subscribers.splice(index, 1);
  };
};

export const notify = (event, payload) => {
  subscribers.forEach((fn) => fn(event, payload));
};
