import { Link, useParams } from "react-router-dom";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";

import "./UserPage.css";

const UserExperiencesPage = () => {
  const params = useParams();

  return (
    <div>
      <ul className="user-ul">
        <li className="user-li">
          {/* <div className="user-circle-li"></div> */}
          <Link to={`/user/${params.userId}/experiences/past`}>
            <ChevronDoubleLeftIcon className="user-personal-icon" />
            <p>Experiencias pasadas</p>
          </Link>
        </li>
        <li className="user-li">
          {/* <div className="user-circle-li"></div> */}
          <Link to={`/user/${params.userId}/experiences/enrolled`}>
            <ChevronDoubleRightIcon className="user-personal-icon" />
            <p>Experiencias en las que apareces inscrito</p>
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
