import { Link, useParams } from "react-router-dom";

const UserPersonalPage = () => {
  const params = useParams();

  return (
    <div>
      <h2>Datos personales</h2>
      <ul>
        <li>
          <Link to={`/user/${params.userId}/personal/avatar`}>
            Añadir avatar
          </Link>
        </li>
        <li>
          <Link to={`/user/${params.userId}/personal/name`}>Nombre</Link>
        </li>
        <li>
          <Link to={`/user/${params.userId}/personal/bio`}>Bio</Link>
        </li>
        <li>
          <Link to={`/user/${params.userId}/personal/password`}>
            Cambiar contraseña
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserPersonalPage;
