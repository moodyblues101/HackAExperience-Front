import { Link } from "react-router-dom";

const UserExperiencesPage = () => {
  return (
    <div>
      <h2>Experiencias</h2>
      <ul>
        <li>
          <Link to="/user/:userId/experiences/past">Experiencias pasadas</Link>
        </li>
        <li>
          <Link to="/user/:userId/experiences/enrolled">
            Experiencias en las que apareces inscrito
          </Link>
        </li>
        <li>
          <Link to="/user/:userId/experiences/review">Añadir comentario</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserExperiencesPage;
