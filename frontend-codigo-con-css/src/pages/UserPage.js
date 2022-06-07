import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
import { IdentificationIcon } from "@heroicons/react/outline";
import { TableIcon } from "@heroicons/react/outline";

import "./UserPage.css";

const UserPage = () => {
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  return (
    <div className="user-page-container">
      <ul className="user-ul">
        <li className="user-li">
          {/* <div className="user-circle-li"></div> */}
          <Link to={`/user/${userId}/personal`}>
            <IdentificationIcon className="user-icon" />
            <p>Datos Personales</p>
          </Link>
        </li>
        <li className="user-li">
          {/* <div className="user-circle-li"></div> */}
          <Link to={`/user/${userId}/experiences`}>
            <TableIcon className="user-icon" />
            <p>Experiencias</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserPage;
