import { useState, useEffect } from "react";

const useEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/entries`);

      if (res.ok) {
        const body = await res.json();
        setEntries(body.data);
      }
    };

    fetchEntries();
  }, []);

  return [entries, setEntries];
};

export default useEntries;
