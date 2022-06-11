import React, { useState } from "react";
import { useParams } from "react-router-dom";

import PatchDatesExperience from "../../components/PatchDatesExperience";
import PatchRequest from "../../components/PatchRequest";
import Button from "../../ui/FormElements/Button";

import "./ModifyExperience.css";

const ModifyExperience = () => {
  const idExp = useParams().idExp;
  const [fieldToUpdate, setFieldToUpdate] = useState("");
  const [isExpShow, setIsExpShow] = useState(false);
  const [inputShow, setInputShow] = useState(false);
  const [inputDateShow, setInputDateShow] = useState(false);

  const inputDateShowHandler = () => {
    setInputDateShow(!inputDateShow);
    setInputShow(false);
  };

  const inputShowHandler = () => {
    setInputDateShow(false);
    setInputShow(!inputShow);
  };

  const toggleHandler = () => {
    setIsExpShow(!isExpShow);
    setInputShow(!inputShow);
  };

  return (
    <React.Fragment>
      <div className="modify-experience-container">
        <div className="modify-menu-container">
          <h3>MODIFICAR EXPERIENCIA POR:</h3>
          <div className="modify-experience-btn-container">
            <Button onClick={inputDateShowHandler}>FECHAS/PLAZAS</Button>
            <div>
              <Button onClick={inputShowHandler}>OTROS CAMPOS</Button>
            </div>
          </div>
          <div className="btn-back">
            <Button to="/user/admin/experiences">VOLVER</Button>
          </div>
        </div>

        {inputDateShow && <PatchDatesExperience idExp={idExp} />}

        {inputShow && (
          <div className="modify-id-container">
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
                <option value="idCategory">Categoría (id)</option>
                <option value="idBusiness">Empresa (id)</option>
              </select>
            </div>
            <div>
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
            id={idExp}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default ModifyExperience;
