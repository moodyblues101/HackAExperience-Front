import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Modal from "../../ui/Modal";
import Button from "../../ui/FormElements/Button";
import DeleteRequest from "../../components/DeleteRequest";

import "./DeleteExperience.css";

const DeleteExperience = () => {
  const history = useHistory();
  const [isExpShow, setIsExpShow] = useState(false);
  const [inputShow, setInputShow] = useState(true);
  const [experienceId, setExperienceId] = useState("");
  const [delExperience, setDelExperience] = useState(false);

  const changeHandler = (event) => {
    setExperienceId(event.target.value);
  };

  const toggleHandler = () => {
    setIsExpShow(!isExpShow);
    setInputShow(!inputShow);
  };
  const cancelDeleteHandler = () => {
    setIsExpShow(false);
    history.replace("/user/admin");
  };

  const confirmDeleteHandler = async () => {
    setIsExpShow(false);
    setDelExperience(true);
  };

  return (
    <>
      {inputShow && (
        <React.Fragment>
          <div className="del-exp">
            <div className="del-exp-label-input">
              <label htmlFor="experienceId" className="del-exp-label">
                Introduce el id de la experiencia a borrar:
              </label>
              <input
                id="experienceId"
                type="text"
                value={experienceId}
                onChange={changeHandler}
              />
            </div>
            <div>
              <Button to="/user/admin/">VOLVER</Button>
              <Button onClick={toggleHandler} type="button">
                BORRAR
              </Button>
            </div>
          </div>
        </React.Fragment>
      )}
      <Modal
        show={isExpShow}
        onCancel={cancelDeleteHandler}
        header="Confirmacion"
        // footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler} type="button">
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler} type="button">
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>¿Estas seguro de querer borrar la experiencia {experienceId}?</p>
      </Modal>
      {delExperience && <DeleteRequest id={experienceId} />}
    </>
  );
};

export default DeleteExperience;
