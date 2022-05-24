//URL: http://localhost:3000/user/:userId/personal/bio

import React, { useState } from "react";

import Modal from "../../ui/Modal";

const AddBio = () => {
  const [enteredBio, setEnteredBio] = useState("");
  const [enteredBioIsValid, setEnteredBioIsValid] = useState(true);
  const [enteredBioTouched, setEnteredBioTouched] = useState(false);
  const [didSubmit, setDidSubmit] = useState();
  const [httpError, setHttpError] = useState();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(enteredBio);

    setEnteredBioTouched(true);

    if (enteredBio.trim() === "") {
      setEnteredBioIsValid(false);
      return;
    }

    const addedBio = async (entBio) => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/users", {
          method: "PATCH",
          // body: //falta meter el Bio,
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

    addedBio(enteredBio);

    if (httpError) {
      return (
        <section>
          <p>{httpError}</p>
        </section>
      );
    }

    setEnteredBio("");
  };

  const hideModal = () => {
    setDidSubmit(false);
  };

  // OJO CON ESTE VALOR, DONDE SE USA?
  const bioInputIsValid = !enteredBioIsValid && enteredBioTouched;

  const didSubmitModelContent = (
    <React.Fragment>
      <p>Bio añadida correctamente</p>
      <div>
        <button onClick={hideModal}>Close</button>
      </div>
    </React.Fragment>
  );

  return (
    <div>
      <h2>Añadir bio</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          type="text"
          value={enteredBio}
          onChange={(event) => setEnteredBio(event.target.value)}
        />
        <button>Añadir</button>
      </form>
      {didSubmit && <Modal onClose={hideModal}>{didSubmitModelContent}</Modal>}
      {/* {!didSubmit && <Modal onClose={hideModal}>{httpError}</Modal>} */}
    </div>
  );
};

export default AddBio;
