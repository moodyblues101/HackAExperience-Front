import { Link } from "react-router-dom";

import { BriefcaseIcon, CollectionIcon } from "@heroicons/react/outline";

import "./AdminPage.css";

const AdminPage = () => {
  return (
    <>
      <div className="admin-container">
        <ul className="admin-ul">
          <li className="admin-il">
            {/* <div className="circle-il"></div> */}
            <Link to="/user/admin/experiences">
              <CollectionIcon className="user-admin-icon" />
              <p>Gestionar experiencias</p>
            </Link>
          </li>
          {/* <li className="admin-il">
            <div className="circle-il"></div>
            <Link to="/user/admin/new-experience">Añadir experiencia</Link>
          </li>
          <li className="admin-il">
            <div className="circle-il"></div>
            <Link to="/user/admin/modify-experience">
              Modificar experiencia
            </Link>
          </li>
          <li className="admin-il">
            <div className="circle-il"></div>
            <Link to="/user/admin/delete-experience">Borrar experiencia</Link>
          </li>
          <li className="admin-il">
            <div className="circle-il"></div>
            <Link to="/user/admin/manage-experience-comments">
              Gestionar comentarios
            </Link>
          </li> */}
          <li className="admin-il">
            {/* <div className="circle-il"></div> */}
            <Link to="/user/admin/business">
              <BriefcaseIcon className="user-admin-icon" />
              <p>Gestionar empresas colaboradoras</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminPage;
