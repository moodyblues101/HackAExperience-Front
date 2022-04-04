import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import useInput from "../../hooks/use-input";
import Modal from "../../ui/Modal";

import classes from "./CreateNewExperience.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const CreateNewExperience = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [httpError, setHttpError] = useState(null);
  const [httpErrorImage, setHttpErrorImage] = useState(null);

  const [file, setFile] = useState();
  // const [avatarUrl, setAvatarUrl] = useState();

  const {
    value: experienceNameValue,
    isValid: experienceNameIsValid,
    hasError: experienceNameHasError,
    valueChangeHandler: experienceNameChangeHandler,
    inputBlurHandler: experienceNameHandler,
    reset: resetExperienceName,
  } = useInput(isNotEmpty);

  const {
    value: experienceDescriptionValue,
    isValid: experienceDescriptionIsValid,
    hasError: experienceDescriptionHasError,
    valueChangeHandler: experienceDescriptionChangeHandler,
    inputBlurHandler: experienceDescriptionHandler,
    reset: resetExperienceDescription,
  } = useInput(isNotEmpty);

  const {
    value: experienceCityValue,
    isValid: experienceCityIsValid,
    hasError: experienceCityHasError,
    valueChangeHandler: experienceCityChangeHandler,
    inputBlurHandler: experienceCityHandler,
    reset: resetExperienceCity,
  } = useInput(isNotEmpty);

  const {
    value: experiencePriceValue,
    isValid: experiencePriceIsValid,
    hasError: experiencePriceHasError,
    valueChangeHandler: experiencePriceChangeHandler,
    inputBlurHandler: experiencePriceHandler,
    reset: resetExperiencePrice,
  } = useInput(isNotEmpty);

  const {
    value: experienceTotalPlacesValue,
    isValid: experienceTotalPlacesIsValid,
    hasError: experienceTotalPlacesHasError,
    valueChangeHandler: experienceTotalPlacesChangeHandler,
    inputBlurHandler: experienceTotalPlacesHandler,
    reset: resetExperienceTotalPlaces,
  } = useInput(isNotEmpty);

  const {
    value: experienceEventStartDateValue,
    isValid: experienceEventStartDateIsValid,
    hasError: experienceEventStartDateHasError,
    valueChangeHandler: experienceEventStartDateChangeHandler,
    inputBlurHandler: experienceEventStartDateHandler,
    reset: resetExperienceEventStartDate,
  } = useInput(isNotEmpty);

  const {
    value: experienceEventEndDateValue,
    isValid: experienceEventEndDateIsValid,
    hasError: experienceEventEndDateHasError,
    valueChangeHandler: experienceEventEndDateChangeHandler,
    inputBlurHandler: experienceEventEndDateHandler,
    reset: resetExperienceEventEndDate,
  } = useInput(isNotEmpty);

  const {
    value: experienceIdCategoryValue,
    isValid: experienceIdCategoryIsValid,
    hasError: experienceIdCategoryHasError,
    valueChangeHandler: experienceIdCategoryChangeHandler,
    inputBlurHandler: experienceIdCategoryHandler,
    reset: resetExperienceIdCategory,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    experienceNameIsValid &&
    experienceDescriptionIsValid &&
    experienceCityIsValid &&
    experiencePriceIsValid &&
    experienceTotalPlacesIsValid &&
    experienceEventStartDateIsValid &&
    experienceEventEndDateIsValid &&
    experienceIdCategoryIsValid
  ) {
    formIsValid = true;
  }

  const experienceNameClasses = experienceNameHasError
    ? "form-control invalid"
    : "form-control";

  const experienceDescriptionClasses = experienceDescriptionHasError
    ? "form-control invalid"
    : "form-control";

  const experienceCityClasses = experienceCityHasError
    ? "form-control invalid"
    : "form-control";

  const experiencePriceClasses = experiencePriceHasError
    ? "form-control invalid"
    : "form-control";

  const experienceTotalPlacesClasses = experienceTotalPlacesHasError
    ? "form-control invalid"
    : "form-control";

  const experienceEventStartDateClasses = experienceEventStartDateHasError
    ? "form-control invalid"
    : "form-control";

  const experienceEventEndDateClasses = experienceEventEndDateHasError
    ? "form-control invalid"
    : "form-control";

  const experienceIdCategoryClasses = experienceIdCategoryHasError
    ? "form-control invalid"
    : "form-control";

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    const experience = {
      name: experienceNameValue,
      description: experienceDescriptionValue,
      city: experienceCityValue,
      price: experiencePriceValue,
      totalPlaces: experienceTotalPlacesValue,
      eventStartDate: experienceEventStartDateValue,
      eventEndDate: experienceEventEndDateValue,
      idCategory: experienceIdCategoryValue,
    };

    setIsLoading(true);
    setHttpError(null);
    setHttpErrorImage(null);

    const addExperience = async (experience) => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/experiences/",
          {
            method: "POST",
            body: JSON.stringify(experience),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();

        console.log(data);

        const idExperience = data.experienceId;
        console.log(idExperience);
        setDidSubmit(true);
        setIsLoading(false);

        const formData = new FormData();

        formData.append("sampleFile", file);

        const responseImage = await axios.post(
          `http://localhost:3000/api/v1/experiences/${idExperience}/images`,
          formData
        );

        if (!responseImage.ok) {
          throw new Error("uploaded images went wrong");
        }

        // setAvatarUrl(response.data.avatarUrl);
      } catch (error) {
        setHttpError(error.message);
      }
      setIsLoading(false);
      // console.log("despues del loading false", idExperience);
    };

    addExperience(experience);

    resetExperienceName();
    resetExperienceDescription();
    resetExperienceCity();
    resetExperiencePrice();
    resetExperienceTotalPlaces();
    resetExperienceEventStartDate();
    resetExperienceEventEndDate();
    resetExperienceIdCategory();
  };

  console.log("antes del if de is loading");
  if (isLoading) {
    return (
      <section className={classes.error_text}>
        <p>Loading...</p>
      </section>
    );
  }

  const hideModal = () => {
    setDidSubmit(false);
    return (
      <>
        <Navigate to="new-experience/addImages">Añadir imagenes</Navigate>
      </>
    );
  };

  // const returnMainPage = () => {
  //   return <Navigate to='/user/admin/*' />;
  // };

  console.log("antes del if de httpError", httpError);
  if (httpError) {
    console.log("estoy en el if");
    return (
      <section className={classes.error_text}>
        <p>{httpError}</p>
        {/* <button onClick={returnMainPage}>Volver a pagina principal</button> */}
      </section>
    );
  }

  const didSubmitModelContent = (
    <React.Fragment>
      <p>Experiencia creada correctamente</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={hideModal}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <>
      <h2>Crear nueva experiencia</h2>
      <form onSubmit={submitHandler}>
        <div className={experienceNameClasses}>
          <label htmlFor="name">Nombre de la experiencia</label>
          <input
            type="text"
            id="name"
            value={experienceNameValue}
            onChange={experienceNameChangeHandler}
            onBlur={experienceNameHandler}
          />
          {experienceNameHasError && (
            <p className={classes.error_text}>Introduzca un nombre.</p>
          )}
        </div>
        <div className={experienceDescriptionClasses}>
          <label htmlFor="description">Descripción</label>
          <textarea
            rows="6"
            id="description"
            value={experienceDescriptionValue}
            onChange={experienceDescriptionChangeHandler}
            onBlur={experienceDescriptionHandler}
          />
          {experienceDescriptionHasError && (
            <p className={classes.error_text}>Introduzca una descripcion.</p>
          )}
        </div>
        <div className={experienceCityClasses}>
          <label htmlFor="city">Ciudad</label>
          <input
            type="text"
            id="city"
            value={experienceCityValue}
            onChange={experienceCityChangeHandler}
            onBlur={experienceCityHandler}
          />
          {experienceCityHasError && (
            <p className={classes.error_text}>Introduzca una ciudad.</p>
          )}
        </div>
        <div className={experiencePriceClasses}>
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            value={experiencePriceValue}
            onChange={experiencePriceChangeHandler}
            onBlur={experiencePriceHandler}
          />
          {experiencePriceHasError && (
            <p className={classes.error_text}>Introduzca un precio.</p>
          )}
        </div>
        <div className={experienceTotalPlacesClasses}>
          <label htmlFor="totalPlaces">Total de plazas</label>
          <input
            type="number"
            id="totalPlaces"
            value={experienceTotalPlacesValue}
            onChange={experienceTotalPlacesChangeHandler}
            onBlur={experienceTotalPlacesHandler}
          />
          {experienceTotalPlacesHasError && (
            <p className={classes.error_text}>
              Introduzca el numero total de plazas.
            </p>
          )}
        </div>
        <div className={experienceEventStartDateClasses}>
          <label htmlFor="eventStartDate">Fecha de comienzo</label>
          <input
            type="text"
            id="eventStartDate"
            value={experienceEventStartDateValue}
            onChange={experienceEventStartDateChangeHandler}
            onBlur={experienceEventStartDateHandler}
          />
          {experienceEventStartDateHasError && (
            <p className={classes.error_text}>
              Introduzca una fecha de comienzo.
            </p>
          )}
        </div>
        <div className={experienceEventEndDateClasses}>
          <label htmlFor="eventEndDate">Fecha de fin</label>
          <input
            type="text"
            id="eventEndDate"
            value={experienceEventEndDateValue}
            onChange={experienceEventEndDateChangeHandler}
            onBlur={experienceEventEndDateHandler}
          />
          {experienceEventEndDateHasError && (
            <p className={classes.error_text}>Introduzca una fecha de fin.</p>
          )}
        </div>
        <div className={experienceIdCategoryClasses}>
          <label htmlFor="idCategory">Id de categoria</label>
          <input
            type="text"
            id="idCategory"
            value={experienceIdCategoryValue}
            onChange={experienceIdCategoryChangeHandler}
            onBlur={experienceIdCategoryHandler}
          />
          {experienceIdCategoryHasError && (
            <p className={classes.error_text}>Introduzca una categoria.</p>
          )}
        </div>
        <div>
          <label>
            Imagene(s):
            <input
              multiple
              type="file"
              onChange={(event) => {
                const file = event.target.files[0];
                setFile(file);
              }}
            />
          </label>
        </div>
        <div className={classes.form_actions}>
          <button disabled={!formIsValid}>Añadir experiencia</button>
        </div>
      </form>
      {didSubmit && <Modal onClose={hideModal}>{didSubmitModelContent}</Modal>}
    </>
  );
};

export default CreateNewExperience;
