import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/auth-context";

const UserPage = () => {
  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;
  return (
    <div>
      <h1>User Page</h1>
      <ul>
        <li>
          <Link to={`/user/${userId}/personal`}>Datos Personales</Link>
        </li>
        <li>
          <Link to={`/user/${userId}/experiences`}>Experiencias</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserPage;