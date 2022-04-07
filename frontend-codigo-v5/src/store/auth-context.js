import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  idUser: "",
  role: "",
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpiratingTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpiratingTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedUserId = localStorage.getItem("idUser");
  const storedRole = localStorage.getItem("role");
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 60000) {
    localStorage.removeItem("idUser");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    idUser: storedUserId,
    role: storedRole,
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  let initialUserId;
  let initialRole;
  if (tokenData) {
    initialToken = tokenData.token;
    initialUserId = tokenData.idUser;
    initialRole = tokenData.role;
  }

  const [token, setToken] = useState(initialToken);
  const [idUser, setIdUser] = useState(initialUserId);
  const [role, setRole] = useState(initialRole);

  const userIsLoggedIn = !!token; //convierte en booleano

  const logoutHandler = useCallback(() => {
    setToken(null);
    setIdUser(null);
    setRole(null);
    localStorage.removeItem("idUser");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (idUser, role, token, expirationTime) => {
    setToken(token);
    setIdUser(idUser);
    setRole(role);
    localStorage.setItem("idUser", idUser);
    localStorage.setItem("role", role);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainigTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainigTime);
  };

  useEffect(() => {
    if (tokenData) {
      // console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    idUser: idUser,
    role: role,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
