//URL: http://localhost:3000/user/:userId/personal/name

import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import Modal from "../../ui/Modal";
import AuthContext from "../../store/auth-context";

const AddName = () => {
  const params = useParams();
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [didSubmit, setDidSubmit] = useState();
  const [httpError, setHttpError] = useState();

  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(enteredName);

    setEnteredNameTouched(true);

    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }

    const addedName = async (entName, token) => {
      const authToken = "Bearer" + token;
      console.log(authToken);
      try {
        const response = await fetch("http://localhost:3000/api/v1/users", {
          method: "PATCH",
          body: JSON.stringify(entName),
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
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

    addedName(enteredName, authCtx.token);

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

  //el error sale sin escribir nada. Mirarlo
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
        {/* {!nameInputIsValid && <p>Introduzca un nombre.</p>} */}
        <button>Añadir</button>
      </form>
      {didSubmit && <Modal onClose={hideModal}>{didSubmitModelContent}</Modal>}
      {/* {!didSubmit && <Modal onClose={hideModal}>{httpError}</Modal>} */}
      <div>
        <Link to={`/user/${params.userId}/personal`}>Volver</Link>
      </div>
    </div>
  );
};

export default AddName;
