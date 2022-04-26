import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from "../../store/auth-context";
import "./MainHeader.css";
import { SearchIcon } from "@heroicons/react/outline";

const MainHeader = () => {
  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;
  const user = authCtx.userRole;

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };
  return (
    <header className="header_main">
      <Link to="/" className="logo">
        HackAnExperience
      </Link>
      <form className="form_search">
        <input />
        <button className="form_search_btn">
          <SearchIcon className="icon_search" />
        </button>
      </form>
      <nav>
        <ul>
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
            <li className="btn_login">
              <Link to="/user/:userId">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button className="btn_logout" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
