import React, { useState, useEffect, useContext, useCallback } from "react";

import Input from "../../../ui/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../../util/validators";
import Button from "../../../ui/FormElements/Button";
import { useForm } from "../../../hooks/form-hook";
import { useHttpClient } from "../../../hooks/http-hook";
import { AuthContext } from "../../../store/auth-context";
import ErrorModal from "../../../ui/ErrorModal";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import DeleteReviews from "../../../components/DeleteReviews";

const ManageExperienceReviewsByUserAndExperience = () => {
  const [isExpShow, setIsExpShow] = useState(false);
  const [inputShow, setInputShow] = useState(true);
  const [formState, inputHandler] = useForm(
    {
      userId: {
        value: "",
        isValid: false,
      },
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
      )}
      {isExpShow && (
        <>
          <GetReviewsTwoData
            user={formState.inputs.userId.value}
            experience={formState.inputs.idExperience.value}
          />
          <div style={{ "margin-top": "2rem" }}>
            <Button to="/user/admin/manage-experience-comments">VOLVER</Button>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default ManageExperienceReviewsByUserAndExperience;

const GetReviewsTwoData = ({ user, experience }) => {
  const [reviews, setReviews] = useState([]);
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let content;

  const fetchReviews = useCallback(async () => {
    try {
      const res = await sendRequest(
        `http://localhost:3000/api/v1/experiences/${experience}/reviews`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );

      const reviewsMapped = res.map((rev) => {
        return {
          id: rev.id,
          idExperience: experience,
          idUser: rev.idUser,
          comment: rev.comment,
        };
      });

      const transformedReviews = reviewsMapped.filter(
        (rev) => rev.idUser === +user
      );

      setReviews(transformedReviews);
    } catch (err) { }
  }, [user, experience, auth.token, sendRequest]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  if (reviews.length === 0) {
    content = <p>Ese usuario o experiencia no tiene comentarios</p>;
  }
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {content}
      <DeleteReviews reviews={reviews} />
    </>
  );
};
