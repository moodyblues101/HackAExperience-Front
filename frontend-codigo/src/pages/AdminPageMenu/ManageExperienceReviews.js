// import { useState } from "react";

import { Link } from "react-router-dom";
import Button from "../../ui/FormElements/Button";

const ManageExperienceReviews = () => {
  return (
    <>
      <div>Gestionar comentarios</div>
      <ul>
        <li>
          <Link to="/user/admin/manage-experience-comments/user">
            Gestionar comentarios de un usuario
          </Link>
        </li>
        <li>
          <Link to="/user/admin/manage-experience-comments/experience">
            Gestionar comentarios de una experiencia
          </Link>
        </li>
        <li>
          <Link to="/user/admin/manage-experience-comments/user-experience">
            Gestionar comentarios de un usuario en una experiencia
          </Link>
        </li>
      </ul>

      <Button to="/user/admin/">VOLVER</Button>
    </>
  );
};

export default ManageExperienceReviews;

//obtener comentarios de un usuario (componente a parte con props, mismo que siguiente)

//obtener comentarios de una experiencia

//obtener comentario de un usuario en una experiencia (gestionar todo en el mismo componente)
