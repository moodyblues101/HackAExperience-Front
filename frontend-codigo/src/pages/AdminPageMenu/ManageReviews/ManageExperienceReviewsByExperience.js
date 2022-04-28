import React, { useState } from "react";

import Input from "../../../ui/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../../util/validators";
import Button from "../../../ui/FormElements/Button";
import { useForm } from "../../../hooks/form-hook";
import GetReviews from "../../../components/GetReviews";

const ManageExperienceReviewsByExperience = () => {
  const [isExpShow, setIsExpShow] = useState(false);
  const [inputShow, setInputShow] = useState(true);
  const [formState, inputHandler] = useForm(
    {
      idExperience: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const toggleHandler = () => {
    setIsExpShow(!isExpShow);
    setInputShow(!inputShow);
  };

  return (
    <React.Fragment>
      {inputShow && (
        <>
          <Input
            id="idExperience"
            element="input"
            type="text"
            label="Introduzca id de experiencia:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduzca una id válida"
            onInput={inputHandler}
          />
          <Button type="button" onClick={toggleHandler}>
            MOSTRAR
          </Button>
          <Button to="/user/admin/manage-experience-comments">VOLVER</Button>
        </>
      )}
      {isExpShow && (
        <GetReviews
          idToGet={formState.inputs.idExperience.value}
          urlPath="experiences"
        />
      )}
    </React.Fragment>
  );
};

export default ManageExperienceReviewsByExperience;
