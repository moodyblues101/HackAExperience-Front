import { Link, useParams } from "react-router-dom";

import {
  UserCircleIcon,
  UserRemoveIcon,
  KeyIcon,
  ChatIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";

import "./UserPage.css";

const UserPersonalPage = () => {
  const params = useParams();

  return (
    <div>
      <h2>Datos personales</h2>
      <ul className="user-ul">
        <li className="user-li">
          {/* <div className="user-circle-li"></div> */}
          <Link to={`/user/${params.userId}/personal/avatar`}>
            <UserCircleIcon className="user-personal-icon" />
            <p>Añadir avatar</p>
          </Link>
        </li>
        <li className="user-li">
          {/* <div className="user-circle-li"></div> */}
          <Link to={`/user/${params.userId}/personal/name`}>
            <EmojiHappyIcon className="user-personal-icon" />
            <p>Nombre</p>
          </Link>
        </li>
        <li className="user-li">
          {/* <div className="user-circle-li"></div> */}
          <Link to={`/user/${params.userId}/personal/bio`}>
            <ChatIcon className="user-personal-icon" />
            <p>Bio</p>
          </Link>
        </li>
        <li className="user-li">
          {/* <div className="user-circle-li"></div> */}
          <Link to={`/user/${params.userId}/personal/password`}>
            <KeyIcon className="user-personal-icon" />
            <p>Cambiar contraseña</p>
          </Link>
        </li>
        <li className="user-li">
          {/* <div className="user-circle-li"></div> */}
          <Link to={`/user/${params.userId}/personal/delete`}>
            <UserRemoveIcon className="user-personal-icon" />
            <p>Darse de baja</p>
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
