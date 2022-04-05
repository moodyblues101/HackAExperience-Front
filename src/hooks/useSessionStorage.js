import { useState, useEffect } from "react";

const useSessionStorage = (key, defaultValue) => {
  const [data, setData] = useState(
    JSON.parse(sessionStorage.getItem(key)) || defaultValue
  );

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(data));
  }, [data, key]);

  return [data, setData];
};

export default useSessionStorage;
