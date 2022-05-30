import React, { useState } from "react";

import Input from "../../../ui/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../../util/validators";
import Button from "../../../ui/FormElements/Button";
import { useForm } from "../../../hooks/form-hook";
import GetReviews from "../../../components/GetReviews";

const ManageExperienceReviewsByUser = () => {
  const [isExpShow, setIsExpShow] = useState(false);
  const [inputShow, setInputShow] = useState(true);
  const [formState, inputHandler] = useForm(
    {
      userId: {
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
          <div style={{ width: "15rem" }}>
            <Input
              id="userId"
              element="input"
              type="text"
              label="Introduzca id de usuario:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Por favor, introduzca una id válida"
              onInput={inputHandler}
            />
          </div>
          <Button to="/user/admin/manage-experience-comments">VOLVER</Button>
          <Button type="button" onClick={toggleHandler}>
            MOSTRAR
          </Button>
        </>
      )}
      {isExpShow && (
        <GetReviews idToGet={formState.inputs.userId.value} urlPath="users" />
      )}
    </React.Fragment>
  );
};

export default ManageExperienceReviewsByUser;
