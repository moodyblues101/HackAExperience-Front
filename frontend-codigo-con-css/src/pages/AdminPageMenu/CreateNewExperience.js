import React, { useState } from "react";

import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../util/validators";
import Input from "../../ui/FormElements/Input";
import Button from "../../ui/FormElements/Button";
import ReactivateExperience from "../../components/ReactivateExperience";
import CreateExperience from "../../components/CreateExperience";

import "./CreateNewExperience.css";

const CreateNewExperience = () => {
  const [showIdInput, setShowIdInput] = useState(false);
  const [showReactivate, setShowReactivate] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [formState, inputHandler] = useForm(
    { idExp: { value: "", isValid: false } },
    false
  );

  const showInputIdExpHandler = () => {
    setShowIdInput(true);
    setShowNew(false);
  };

  const showNewHandler = () => {
    setShowIdInput(false);
    setShowNew(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setShowReactivate(true);
  };

  return (
    <React.Fragment>
      <div className="button-container">
        <Button type="button" onClick={showInputIdExpHandler}>
          REACTIVAR EXPERIENCIA
        </Button>
        <Button type="button" onClick={showNewHandler}>
          AÑADIR NUEVA EXPERIENCIA
        </Button>
        {showIdInput && (
          <form onSubmit={submitHandler}>
            <div style={{ width: "20rem", margin: "0 auto" }}>
              <Input
                id="idExp"
                element="input"
                type="text"
                label="Introduce el id de la experiencia a reactivar:"
                validators={[VALIDATOR_REQUIRE]}
                errorText="Por favor, introduce un id válido."
                onInput={inputHandler}
              />
            </div>
            <Button type="submit">REACTIVAR</Button>
          </form>
        )}
      </div>
      {showReactivate && (
        <ReactivateExperience idExp={formState.inputs.idExp.value} />
      )}
      {showNew && <CreateExperience />}
    </React.Fragment>
  );
};

export default CreateNewExperience;
