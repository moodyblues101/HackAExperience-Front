// import { useState } from "react";

import { Link } from "react-router-dom";
import Button from "../../ui/FormElements/Button";

import "./ManageBusiness.css";

const ManageBusiness = () => {
  return (
    <>
      <div>
        <ul className="business-ul">
          <li className="business-li">
            <div className="business-circle-li"></div>
            <Link to="/user/admin/business/add-business">
              Añadir nueva empresa
            </Link>
          </li>
          <li className="business-li">
            <div className="business-circle-li"></div>
            <Link to="/user/admin/business/manage">
              Listado empresas (gestión)
            </Link>
          </li>
        </ul>
      </div>

      <Button to="/user/admin/">VOLVER</Button>
    </>
  );
};

export default ManageBusiness;
