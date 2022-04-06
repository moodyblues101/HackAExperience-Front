import React, { useState } from "react";

import Modal from "../../ui/Modal";
import "./DeleteExperience.css";

const DeleteExperience = () => {
  const [enteredId, setEnteredId] = useState("");
  const [enteredIdIsValid, setEnteredIdIsValid] = useState(true);
  const [enteredIdTouched, setEnteredIdTouched] = useState(false);
  const [didSubmit, setDidSubmit] = useState();
  const [httpError, setHttpError] = useState();

  function submitHandler(event) {
    event.preventDefault();

    setEnteredIdTouched(true);

    // console.log("antes del if id is valid: ", enteredId);
    // console.log("antes del if enteredISValid: ", enteredIdIsValid);

    if (enteredId.trim() === "") {
      setEnteredIdIsValid(false);
      return;
    }

    // setEnteredIdIsValid(true);

    const deleteExp = async (id) => {
      console.log("deleteExp id: ", id);
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/experiences/${id}`,
          {
            method: "DELETE",
          }
        );
        console.log("response.ok: ", response.ok);

        if (!response.ok) {
          throw Error("Something went wrong!");
        }
        setDidSubmit(true);
      } catch (error) {
        console.log("esto es un error ", error.message);
        setHttpError(error.message);
        setDidSubmit(false);
      }
    };

    console.log("antes del if, enteredISValid: ", enteredIdIsValid);
    if (enteredIdIsValid) {
      // try {
      deleteExp(enteredId);
    }
    //   catch (error) {
    //     console.log("esto es un error ", error.message);
    //     setHttpError(error.message);
    //     setDidSubmit(false);
    //   }
    // }
    console.log("estoy antes del if httpError");
    if (httpError) {
      return (
        <section className="error-text">
          <p>{httpError}</p>
        </section>
      );
    }

    setEnteredId("");
  }

  const hideModal = () => {
    setDidSubmit(false);
  };

  const idInputIsValid = !enteredIdIsValid && enteredIdTouched;

  const didSubmitModelContent = (
    <React.Fragment>
      <p>Experiencia borrada correctamente</p>
      <div className="actions">
        <button className="button" onClick={hideModal}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <>
      <h2>Borrar experiencia</h2>
      <form className="form-control" onSubmit={submitHandler}>
        <div>
          <label htmlFor="idExperience">Id de la experiencia a borrar</label>
          <input
            className="exp-input"
            type="text"
            id="idExperience"
            value={enteredId}
            onChange={(event) => setEnteredId(event.target.value)}
          />
          {idInputIsValid && <p className="error-text">Campo requerido</p>}
        </div>
        <div>
          <button className="del-btn">Borrar</button>
        </div>
      </form>
      {didSubmit && <Modal onClose={hideModal}>{didSubmitModelContent}</Modal>}
      {/* {!didSubmit && <Modal onClose={hideModal}>{httpError}</Modal>} */}
    </>
  );
};

export default DeleteExperience;
