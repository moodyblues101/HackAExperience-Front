import { Link } from "react-router-dom";

import "./AdminPage.css";
import { Fragment } from "react";

const AdminPage = () => {
  return (
    <Fragment>
      <h1>Admin Page</h1>
      <ul className="admin-ul">
        <li className="admin-il">
          <div className="circle-il"></div>
          <Link to="/user/admin/new-experience">Añadir experiencia</Link>
        </li>
        <li className="admin-il">
          <div className="circle-il"></div>
          <Link to="/user/admin/modify-experience">Modificar experiencia</Link>
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
        </li>
      </ul>
    </Fragment>
  );
};

export default AdminPage;
