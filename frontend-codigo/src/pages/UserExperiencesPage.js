import { Link, useParams } from "react-router-dom";

const UserExperiencesPage = () => {
  const params = useParams();

  return (
    <div>
      <h2>Experiencias</h2>
      <ul>
        <li>
          <Link to={`/user/${params.userId}/experiences/past`}>
            Experiencias pasadas
          </Link>
        </li>
        <li>
          <Link to={`/user/${params.userId}/experiences/enrolled`}>
            Experiencias en las que apareces inscrito
          </Link>
        </li>
        <li>
          <Link to={`/user/${params.userId}/experiences/review`}>
            Añadir comentario
          </Link>
        </li>
      </ul>
      <div>
        <Link to={`/user/${params.userId}`}>Volver a pagina de usuario</Link>
      </div>
    </div>
  );
};

export default UserExperiencesPage;
