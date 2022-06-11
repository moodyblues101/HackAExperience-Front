// import { useState } from "react";

import { Link } from "react-router-dom";
import Button from "../../ui/FormElements/Button";
import { DatabaseIcon, DocumentAddIcon } from "@heroicons/react/outline";

import "./ManageBusiness.css";

const ManageBusiness = () => {
  return (
    <>
      <div className="manage-business-container">
        <ul className="business-ul">
          <li className="business-li">
            {/* <div className="business-circle-li"></div> */}
            <Link to="/user/admin/business/add-business">
              <DocumentAddIcon className="business-icon" />
              <p>Añadir nueva empresa</p>
            </Link>
          </li>
          <li className="business-li">
            {/* <div className="business-circle-li"></div> */}
            <Link to="/user/admin/business/manage">
              <DatabaseIcon className="business-icon" />
              <p>Listado empresas (gestión)</p>
            </Link>
          </li>
        </ul>
      </div>

      <Button to="/user/admin/">VOLVER</Button>
    </>
  );
};

export default ManageBusiness;
