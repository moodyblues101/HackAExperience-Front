// import { SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

import PatchRequest from "../../components/PatchRequest";
import Button from "../../ui/FormElements/Button";

import "./ModifyExperience.css";

const ModifyExperience = () => {
  const [idExperience, setIdExperience] = useState("");
  const [fieldToUpdate, setFieldToUpdate] = useState("");
  const [isExpShow, setIsExpShow] = useState(false);
  const [inputShow, setInputShow] = useState(true);

  const toggleHandler = () => {
    setIsExpShow(!isExpShow);
    setInputShow(!inputShow);
  };

  return (
    <React.Fragment>
      {inputShow && (
        <div>
          <div className="field-exp">
            <label htmlFor="idExp" className="field-exp-label">
              Introduce id de la experiencia a modificar:
            </label>
            <input
              id="idExp"
              type="number"
              min={0}
              value={idExperience}
              onChange={(event) => setIdExperience(event.target.value)}
            />
          </div>
          <div className="field-exp">
            <label htmlFor="dataToUpdate-field" className="field-exp-label">
              Elige campo a modificar:
            </label>
            <select
              name="dataToUpdate"
              id="dataToUpdate-field"
              value={fieldToUpdate}
              onChange={(event) => {
                setFieldToUpdate(event.target.value);
              }}
            >
              <option></option>
              <option value="name">Nombre</option>
              <option value="description">Descripción</option>
              <option value="city">Ciudad</option>
              <option value="price">Precio</option>
              <option value="totalPlaces">Total plazas</option>
              <option value="eventStartDate">Fecha inicio</option>
              <option value="eventEndDate">Fecha fin</option>
              <option value="idCategory">Categoría</option>
              <option value="idBusiness">Empresa</option>
            </select>
          </div>
          <div>
            <Button to="/user/admin/">VOLVER</Button>
            <Button type="button" onClick={toggleHandler}>
              MOSTRAR
            </Button>
          </div>
        </div>
      )}
      {isExpShow && (
        <PatchRequest
          urlRoute="experiences"
          dataToUpdate={fieldToUpdate}
          id={idExperience}
        />
      )}
    </React.Fragment>
  );
};

export default ModifyExperience;
