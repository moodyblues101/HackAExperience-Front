import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/auth-context";

import "./UserPage.css";

const UserPage = () => {
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  return (
    <div>
      <ul className="user-ul">
        <li className="user-li">
          <div className="user-circle-li"></div>
          <Link to={`/user/${userId}/personal`}>Datos Personales</Link>
        </li>
        <li className="user-li">
          <div className="user-circle-li"></div>
          <Link to={`/user/${userId}/experiences`}>Experiencias</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserPage;
