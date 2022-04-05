import { useState, useEffect } from "react";

const useEntry = (id, refetchEntry, setRefetchEntry) => {
  const [entry, setEntry] = useState({});

  useEffect(() => {
    const fetchEntry = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/entries/${id}`
      );

      if (res.ok) {
        const body = await res.json();
        setEntry(body.data);
      }
    };

    fetchEntry();
    setRefetchEntry(false);
  }, [id, refetchEntry, setRefetchEntry]);

  return [entry, setEntry];
};

export default useEntry;
