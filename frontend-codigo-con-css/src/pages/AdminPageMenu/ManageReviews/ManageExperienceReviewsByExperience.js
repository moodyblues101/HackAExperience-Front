import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../../ui/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../../util/validators";
import Button from "../../../ui/FormElements/Button";
import { useForm } from "../../../hooks/form-hook";
import GetReviews from "../../../components/GetReviews";

import "./ManageExperienceReviewsByExperience.css";

const ManageExperienceReviewsByExperience = () => {
  const idExp = useParams().idExp;
  // const [isExpShow, setIsExpShow] = useState(false);
  // const [inputShow, setInputShow] = useState(true);
  // const [formState, inputHandler] = useForm(
  //   {
  //     idExperience: {
  //       value: "",
  //       isValid: false,
  //     },
  //   },
  //   false
  // );

  // const toggleHandler = () => {
  //   setIsExpShow(!isExpShow);
  //   setInputShow(!inputShow);
  // };

  return (
    <React.Fragment>
      {/* {inputShow && (
        <>
          <div style={{ width: "15rem" }}>
            <Input
              id="idExperience"
              element="input"
              type="text"
              label="Introduzca id de experiencia:"
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
      )} */}
      {/* {isExpShow && (
        <GetReviews
          idToGet={formState.inputs.idExperience.value}
          urlPath="experiences"
        />
      )} */}
      <div className="manage-reviews-exp-container">
        <GetReviews idToGet={idExp} urlPath="experiences" />
      </div>
    </React.Fragment>
  );
};

export default ManageExperienceReviewsByExperience;
