import { Link } from "react-router-dom";

const UserPersonalPage = () => {
  return (
    <div>
      <h2>Datos personales</h2>
      <ul>
        <li>
          <Link to="/user/:userId/personal/avatar">Añadir avatar</Link>
        </li>
        <li>
          <Link to="/user/:userId/personal/name">Nombre</Link>
        </li>
        <li>
          <Link to="/user/:userId/personal/bio">Bio</Link>
        </li>
        <li>
          <Link to="/user/:userId/personal/password">Cambiar contraseña</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserPersonalPage;
