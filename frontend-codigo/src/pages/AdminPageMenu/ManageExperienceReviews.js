// import { useState } from "react";

import { Link } from "react-router-dom";
import Button from "../../ui/FormElements/Button";

import "./ManageExperienceReviews.css";

const ManageExperienceReviews = () => {
  return (
    <>
      <div className="menu-container">
        <ul className="menu-cont-ul">
          <li className="menu-cont-li">
            <div className="circle-li"></div>
            <Link to="/user/admin/manage-experience-comments/user">
              Gestionar comentarios de un usuario
            </Link>
          </li>
          <li className="menu-cont-li">
            <div className="circle-li"></div>
            <Link to="/user/admin/manage-experience-comments/experience">
              Gestionar comentarios de una experiencia
            </Link>
          </li>
          <li className="menu-cont-li">
            <div className="circle-li"></div>
            <Link to="/user/admin/manage-experience-comments/user-experience">
              Gestionar comentarios de un usuario en una experiencia
            </Link>
          </li>
        </ul>
      </div>

      <Button to="/user/admin/">VOLVER</Button>
    </>
  );
};

export default ManageExperienceReviews;
