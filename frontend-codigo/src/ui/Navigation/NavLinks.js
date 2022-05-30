import { useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import { AuthContext } from "../../store/auth-context";

import "./NavLinks.css";

const NavLinks = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const user = authCtx.userRole;

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };

  return (
    <>
      <ul className="nav-container">
        {!isLoggedIn && (
          <li className="li-login">
            <Link to="/login">Login</Link>
          </li>
        )}
        {!isLoggedIn && (
          <li className="li-register">
            <Link to="/register">Register</Link>
          </li>
        )}
        {isLoggedIn && user === "usuario" && (
          <li className="li-register">
            <Link to="/user/:userId">Menú</Link>
          </li>
        )}
        {isLoggedIn && user === "administrador" && (
          <li className="li-register">
            <Link to="/user/admin/">Menú</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button className="btn-logout" onClick={logoutHandler}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </>
  );
};

export default NavLinks;
