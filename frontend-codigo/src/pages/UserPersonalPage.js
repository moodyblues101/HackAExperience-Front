import { Link, useParams } from "react-router-dom";

import "./UserPage.css";

const UserPersonalPage = () => {
  const params = useParams();

  return (
    <div>
      <h2>Datos personales</h2>
      <ul className="user-ul">
        <li className="user-li">
          <div className="user-circle-li"></div>
          <Link to={`/user/${params.userId}/personal/avatar`}>
            Añadir avatar
          </Link>
        </li>
        <li className="user-li">
          <div className="user-circle-li"></div>
          <Link to={`/user/${params.userId}/personal/name`}>Nombre</Link>
        </li>
        <li className="user-li">
          <div className="user-circle-li"></div>
          <Link to={`/user/${params.userId}/personal/bio`}>Bio</Link>
        </li>
        <li className="user-li">
          <div className="user-circle-li"></div>
          <Link to={`/user/${params.userId}/personal/password`}>
            Cambiar contraseña
          </Link>
        </li>
        <li className="user-li">
          <div className="user-circle-li"></div>
          <Link to={`/user/${params.userId}/personal/delete`}>
            Darse de baja
          </Link>
        </li>
      </ul>
      <div className="back-menu">
        <Link to={`/user/${params.userId}`}>Volver a pagina de usuario</Link>
      </div>
    </div>
  );
};

export default UserPersonalPage;
