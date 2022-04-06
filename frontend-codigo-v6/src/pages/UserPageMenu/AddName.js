//URL: http://localhost:3000/user/:userId/personal/name

import React, { useState } from "react";

import Modal from "../../ui/Modal";

const AddName = () => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [didSubmit, setDidSubmit] = useState();
  const [httpError, setHttpError] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(enteredName);

    setEnteredNameTouched(true);

    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }

    const addedName = async (entName) => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/users", {
          method: "PATCH",
          // body: //falta meter el nombre,
        });

        if (!response.ok) {
          throw new Error("something went wrong");
        }
        setDidSubmit(true);
      } catch (error) {
        setHttpError(error.message);
        setDidSubmit(false);
      }
    };

    addedName(enteredName);

    if (httpError) {
      return (
        <section>
          <p>{httpError}</p>
        </section>
      );
    }

    setEnteredName("");
  };

  const hideModal = () => {
    setDidSubmit(false);
  };

  // OJO CON ESTE VALOR, DONDE SE USA?
  const nameInputIsValid = !enteredNameIsValid && enteredNameTouched;

  const didSubmitModelContent = (
    <React.Fragment>
      <p>Nombre añadido correctamente</p>
      <div>
        <button onClick={hideModal}>Close</button>
      </div>
    </React.Fragment>
  );

  return (
    <div>
      <h2>Añadir nombre</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Nombre:</label>
        <input
          id="name"
          type="text"
          value={enteredName}
          onChange={(event) => setEnteredName(event.target.value)}
        />
        <button>Añadir</button>
      </form>
      {didSubmit && <Modal onClose={hideModal}>{didSubmitModelContent}</Modal>}
      {/* {!didSubmit && <Modal onClose={hideModal}>{httpError}</Modal>} */}
    </div>
  );
};

export default AddName;
