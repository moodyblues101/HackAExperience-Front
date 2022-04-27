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
        <li>
          <Link to={`/user/${params.userId}/personal/delete`}>
            Darse de baja
          </Link>
        </li>
      </ul>
      <div>
        <Link to={`/user/${params.userId}`}>Volver a pagina de usuario</Link>
      </div>
    </div>
  );
};

export default UserPersonalPage;
