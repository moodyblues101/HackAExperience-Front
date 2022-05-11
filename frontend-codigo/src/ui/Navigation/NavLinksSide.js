import { useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import { AuthContext } from "../../store/auth-context";

import "./NavLinksSide.css";

const NavLinksSide = () => {
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
      <ul className="nav-container-side">
        {!isLoggedIn && (
          <li className="li-side">
            <Link to="/login">Login</Link>
          </li>
        )}
        {!isLoggedIn && (
          <li className="li-side">
            <Link to="/register">Register</Link>
          </li>
        )}
        {isLoggedIn && user === "usuario" && (
          <li className="li-side">
            <Link to="/user/:userId">Menú</Link>
          </li>
        )}
        {isLoggedIn && user === "administrador" && (
          <li className="li-side">
            <Link to="/user/admin/">Menú</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button className="btn-logout-side" onClick={logoutHandler}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </>
  );
};

export default NavLinksSide;
