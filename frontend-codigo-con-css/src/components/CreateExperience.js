import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../ui/FormElements/Input";
import Button from "../ui/FormElements/Button";
import Modal from "../ui/Modal";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../util/validators";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";

import "./ReactivateExperience.css";

const CreateExperience = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const startTimeHourRef = useRef();
  const startTimeMinutesRef = useRef();
  const endTimeHourRef = useRef();
  const endTimeMinutesRef = useRef();
  const [fichero, setFichero] = useState();
  const [showErrorImg, setShowErrorImg] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isExpOk, setIsExpOK] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
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

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!fichero || fichero.length !== 3) {
      setShowErrorImg(true);
      return;
    }
    const startTime =
      startTimeHourRef.current.value +
      ":" +
      startTimeMinutesRef.current.value +
      ":00";
    const endTime =
      endTimeHourRef.current.value +
      ":" +
      endTimeMinutesRef.current.value +
      ":00";

    const startDateAndTime =
      formState.inputs.eventStartDate.value + " " + startTime;
    const endDateAndTime = formState.inputs.eventEndDate.value + " " + endTime;

    const now = new Date().getTime();

    if (
      new Date(startDateAndTime).getTime() < new Date(endDateAndTime).getTime()
    ) {
      if (
        new Date(startDateAndTime).getTime() < now ||
        new Date(endDateAndTime).getTime() < now
      ) {
        setShowModal(true);
        return;
      }
    } else {
      setShowModal(true);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", formState.inputs.name.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("city", formState.inputs.city.value);
      formData.append("price", formState.inputs.price.value);
      formData.append("totalPlaces", formState.inputs.totalPlaces.value);
      formData.append("idCategory", formState.inputs.idCategory.value);
      formData.append("idBusiness", formState.inputs.idBusiness.value);

      const res = await sendRequest(
        "http://localhost:3000/api/v1/experiences/",
        "POST",
        formData,
        { Authorization: "Bearer " + auth.token }
      );

      const { experienceId } = res;

      const formDate = new FormData();

      formDate.append("eventStartDate", startDateAndTime);
      formDate.append("eventEndDate", endDateAndTime);

      await sendRequest(
        `http://localhost:3000/api/v1/experiences/${experienceId}/dates`,
        "POST",
        formDate,
        { Authorization: "Bearer " + auth.token }
      );

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

      setIsExpOK(true);
    } catch (err) {
      throw err;
    }
  };

  const cancelModalHandler = () => {
    setShowModal(false);
  };

  const cancelOkModalHandler = () => {
    setIsExpOK(false);
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
        <label style={{ marginRight: "1rem" }} htmlFor="startTime">
          Hora de comienzo:
        </label>
        <select name="startTime-hour" id="startTime" ref={startTimeHourRef}>
          <option value="00">00</option>
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
        </select>
        :
        <select
          name="startTime-minutes"
          id="startTime"
          ref={startTimeMinutesRef}
        >
          <option value="00">00</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
        </select>
        <Input
          id="eventEndDate"
          element="date"
          label="Fecha de final"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor, introduzca una fecha válida."
          onInput={inputHandler}
        />
        <label style={{ marginRight: "1rem" }} id="endTime">
          Hora de final:
        </label>
        <select name="endTime-hour" id="endTime" ref={endTimeHourRef}>
          <option value="00">00</option>
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
        </select>
        :
        <select name="endTime-minutes" id="endTime" ref={endTimeMinutesRef}>
          <option value="00">00</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
        </select>
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
        <label className="new-exp-label">
          Imágenes de la experiencia (max. 3):
        </label>
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
          <Button to="/user/admin/experiences">VOLVER</Button>
        </div>
      </form>

      <Modal
        show={showErrorImg}
        onCancel={cancelModalHandler}
        footer={<Button onClick={cancelModalHandler}>OK</Button>}
      >
        Por favor, introduzca 3 imagenes
      </Modal>

      <Modal
        show={showModal}
        onCancel={cancelModalHandler}
        footer={
          <Button type="button" onClick={cancelModalHandler}>
            OK
          </Button>
        }
      >
        Por favor, comprueba que las fechas y/o horas introducidas son correctas
      </Modal>

      <Modal
        show={isExpOk}
        onCancel={cancelOkModalHandler}
        footer={
          <Button type="button" onClick={cancelOkModalHandler}>
            OK
          </Button>
        }
      >
        Experiencia creada correctamente
      </Modal>
    </React.Fragment>
  );
};

export default CreateExperience;
