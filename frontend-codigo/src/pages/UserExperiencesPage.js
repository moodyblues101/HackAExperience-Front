import { Link, useParams } from "react-router-dom";

import "./UserPage.css";

const UserExperiencesPage = () => {
  const params = useParams();

  return (
    <div>
      <ul className="user-ul">
        <li className="user-li">
          <div className="user-circle-li"></div>
          <Link to={`/user/${params.userId}/experiences/past`}>
            Experiencias pasadas
          </Link>
        </li>
        <li className="user-li">
          <div className="user-circle-li"></div>
          <Link to={`/user/${params.userId}/experiences/enrolled`}>
            Experiencias en las que apareces inscrito
          </Link>
        </li>
      </ul>
      <div className="back-menu">
        <Link to={`/user/${params.userId}`}>Volver a pagina de usuario</Link>
      </div>
    </div>
  );
};

export default UserExperiencesPage;
