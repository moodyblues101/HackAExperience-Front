// import { useState } from "react";

import { Link } from "react-router-dom";
import Button from "../../ui/FormElements/Button";

const ManageBusiness = () => {
  return (
    <>
      <div>Gestionar empresas colaboradoras</div>
      <ul>
        <li>
          <Link to="/user/admin/business/add-business">
            Añadir nueva empresa
          </Link>
        </li>
        <li>
          <Link to="/user/admin/business/manage">
            Listado empresas (gestión)
          </Link>
        </li>
      </ul>

      <Button to="/user/admin/">VOLVER</Button>
    </>
  );
};

export default ManageBusiness;
