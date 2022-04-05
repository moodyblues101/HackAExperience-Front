import { createContext, useContext } from "react";
import useSessionStorage from "../hooks/useSessionStorage";

const UserTokenContext = createContext();

const UserTokenContextProvider = ({ children }) => {
  const [token, setToken] = useSessionStorage("token", "");

  return (
    <UserTokenContext.Provider value={[token, setToken]}>
      {children}
    </UserTokenContext.Provider>
  );
};

const useUserTokenContext = () => {
  return useContext(UserTokenContext);
};

export { UserTokenContext, UserTokenContextProvider, useUserTokenContext };
