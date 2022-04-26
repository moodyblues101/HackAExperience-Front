// import { SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

import PatchRequest from "../../components/PatchRequest";
import Button from "../../ui/FormElements/Button";

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
          <label htmlFor="idExp">
            Introdude id de experiencia a modificar:
          </label>
          <input
            id="idExp"
            type="text"
            value={idExperience}
            onChange={(event) => setIdExperience(event.target.value)}
          />
          <div>
            <label htmlFor="dataToUpdate-field">Elige campo a modificar:</label>
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
              <option value="description">Descripcion</option>
              <option value="city">Ciudad</option>
              <option value="price">Precio</option>
              <option value="totalPlaces">Total plazas</option>
              <option value="eventStartDate">Fecha inicio</option>
              <option value="eventEndDate">Fecha fin</option>
              <option value="idCategory">Categoria</option>
              <option value="idBusiness">Empresa</option>
            </select>
          </div>
          <Button type="button" onClick={toggleHandler}>
            MOSTRAR
          </Button>
        </div>
      )}
      {isExpShow && (
        <PatchRequest
          urlRoute="experiences"
          dataToUpdate={fieldToUpdate}
          id={idExperience}
        />
      )}
      <Button to="/user/admin/">VOLVER</Button>
    </React.Fragment>
  );
};

export default ModifyExperience;
