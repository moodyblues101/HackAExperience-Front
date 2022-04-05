import { useState, useEffect } from "react";
import decodeTokenData from "../helpers/decodeTokenData";

const useUserProfile = (token) => {
  const [user, setUser] = useState({});

  const decodedToken = decodeTokenData(token);

  useEffect(() => {
    if (token) {
      const fetchUserProfile = async () => {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/users/${decodedToken.id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (res.ok) {
          const body = await res.json();
          setUser(body.data);
        }
      };

      fetchUserProfile();
    }
  }, [decodedToken?.id, token]);

  return [user, setUser];
};

export default useUserProfile;
