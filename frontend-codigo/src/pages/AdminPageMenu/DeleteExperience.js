import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Modal from "../../ui/Modal";
import Button from "../../ui/FormElements/Button";

import DeleteRequest from "../../components/DeleteRequest";

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
          <div>
            <input type="text" value={experienceId} onChange={changeHandler} />
            <Button onClick={toggleHandler} type="button">
              BORRAR
            </Button>
          </div>
          <Button to="/user/admin/">VOLVER</Button>
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
