import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../ui/FormElements/Input";
import Button from "../../ui/FormElements/Button";
import ErrorModal from "../../ui/ErrorModal";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../util/validators";
import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../store/auth-context";

// import { SearchIcon } from "@heroicons/react/outline";

import "./CreateNewExperience.css";

const CreateNewExperience = () => {
  const auth = useContext(AuthContext);
  const [fichero, setFichero] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      price: {
        value: null,
        isValid: false,
      },
      totalPlaces: {
        value: null,
        isValid: false,
      },
      eventStartDate: {
        value: null,
        isValid: false,
      },
      eventEndDate: {
        value: null,
        isValid: false,
      },
      idCategory: {
        value: null,
        isValid: false,
      },
      idBusiness: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", formState.inputs.name.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("city", formState.inputs.city.value);
      formData.append("price", formState.inputs.price.value);
      formData.append("totalPlaces", formState.inputs.totalPlaces.value);
      formData.append("eventStartDate", formState.inputs.eventStartDate.value);
      formData.append("eventEndDate", formState.inputs.eventEndDate.value);
      formData.append("idCategory", formState.inputs.idCategory.value);
      formData.append("idBusiness", formState.inputs.idBusiness.value);

      const res = await sendRequest(
        "http://localhost:3000/api/v1/experiences/",
        "POST",
        formData,
        { Authorization: "Bearer " + auth.token }
      );

      const { experienceId } = res;

      for (let index = 0; index < fichero.length; index++) {
        formData.append("imageExperience", fichero[index]);
      }

      await sendRequest(
        `http://localhost:3000/api/v1/experiences/${experienceId}/images`,
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
    history.replace("/user/admin");
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={submitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="name"
          element="input"
          type="text"
          label="Nombre"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
          errorText="Por favor, introduzca un nombre válido (min 3 caracteres)."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Descripción"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Por favor, introduzca una descripción válida (min 5 caracteres)."
          onInput={inputHandler}
        />
        <Input
          id="city"
          element="input"
          label="Ciudad"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
          errorText="Por favor, introduzca un lugar válido (min 3 caracteres)."
          onInput={inputHandler}
        />
        <Input
          id="price"
          element="input"
          label="Precio"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor, introduzca un precio válido."
          onInput={inputHandler}
        />
        <Input
          id="totalPlaces"
          element="input"
          label="Número total de plazas"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor, introduzca un numero válido."
          onInput={inputHandler}
        />
        <Input
          id="eventStartDate"
          element="date"
          label="Fecha de comienzo"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor, introduzca una fecha válida."
          onInput={inputHandler}
        />
        <Input
          id="eventEndDate"
          element="date"
          label="Fecha de final"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor, introduzca una fecha válida."
          onInput={inputHandler}
        />
        <Input
          id="idCategory"
          element="input"
          label="Categoría"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor, introduzca una categoría válida."
          onInput={inputHandler}
        />
        <Input
          id="idBusiness"
          element="input"
          label="Código empresa"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor, introduzca una código válido."
          onInput={inputHandler}
        />
        <label>Imagenes de la experiencia:</label>
        <input
          id="files"
          multiple
          type="file"
          onChange={(event) => {
            const fichero = event.target.files;
            setFichero(fichero);
          }}
        />
        <hr />
        <div>
          <Button type="submit" disabled={!formState.isValid}>
            AÑADIR
          </Button>
          <Button to="/user/admin/">VOLVER</Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CreateNewExperience;
