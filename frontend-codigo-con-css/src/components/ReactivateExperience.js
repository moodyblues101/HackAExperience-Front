import React, {
  useState,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { useHistory } from "react-router-dom";

import Input from "../ui/FormElements/Input";
import Button from "../ui/FormElements/Button";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import { VALIDATOR_REQUIRE } from "../util/validators";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";

import "./ReactivateExperience.css";

const ReactivateExperience = ({ idExp }) => {
  const auth = useContext(AuthContext);
  const startTimeHourRef = useRef();
  const startTimeMinutesRef = useRef();
  const endTimeHourRef = useRef();
  const endTimeMinutesRef = useRef();
  const [loadedData, setLoadedData] = useState("");
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

  const fetchExpToReactivate = useCallback(async () => {
    const resExp = await sendRequest(
      `http://localhost:3000/api/v1/experiences/${idExp}`
    );

    setLoadedData(resExp.price);
    setFormData(
      {
        name: {
          value: resExp.name,
          isValid: true,
        },
        description: {
          value: resExp.description,
          isValid: true,
        },
        city: {
          value: resExp.city,
          isValid: true,
        },
        price: {
          value: resExp.price,
          isValid: true,
        },
        idCategory: {
          value: resExp.idCategory,
          isValid: true,
        },
        idBusiness: {
          value: resExp.idBusiness,
          isValid: true,
        },
      },
      true
    );
  }, [idExp, setFormData, sendRequest]);

  useEffect(() => {
    fetchExpToReactivate();
  }, [fetchExpToReactivate]);

  const submitHandler = async (event) => {
    event.preventDefault();

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
        ` http://localhost:3000/api/v1/experiences/${idExp}/reactivate`,
        "POST",
        formData,
        { Authorization: "Bearer " + auth.token }
      );

      const { experienceId } = res;

      const formDate = new FormData();

      formDate.append(
        "eventStartDate",
        formState.inputs.eventStartDate.value + " " + startTime
      );
      formDate.append(
        "eventEndDate",
        formState.inputs.eventEndDate.value + " " + endTime
      );

      await sendRequest(
        `http://localhost:3000/api/v1/experiences/${experienceId}/dates`,
        "POST",
        formDate,
        { Authorization: "Bearer " + auth.token }
      );
    } catch (err) {}
    history.replace("/user/admin");
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={submitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <p>
          Nombre:{" "}
          <span style={{ fontWeight: "300" }}>
            {formState.inputs.name.value}
          </span>
        </p>
        <p>
          Descripción:{" "}
          <span style={{ fontWeight: "300" }}>
            {formState.inputs.description.value}
          </span>
        </p>
        <p>
          Lugar:{" "}
          <span style={{ fontWeight: "300" }}>
            {formState.inputs.city.value}
          </span>
        </p>
        <p>
          Precio anterior:{" "}
          <span style={{ fontWeight: "300" }}>{loadedData}€</span>
        </p>
        <div style={{ width: "10rem" }}>
          <Input
            id="price"
            element="input"
            type="text"
            label="Nuevo precio:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduzca un precio válido."
            onInput={inputHandler}
          />
        </div>
        {/* <p>
          Número total de plazas anterior:{" "}
          <span style={{ fontWeight: "300" }}>{loadedData.totalPlaces}</span>
        </p> */}
        <div style={{ width: "10rem" }}>
          <Input
            id="totalPlaces"
            element="input"
            type="text"
            label="Número total de plazas:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduzca un numero válido."
            onInput={inputHandler}
          />
        </div>
        <div style={{ width: "10rem" }}>
          <Input
            id="eventStartDate"
            element="date"
            label="Fecha de comienzo"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduzca una fecha válida."
            onInput={inputHandler}
          />
        </div>
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
        <div style={{ width: "10rem" }}>
          <Input
            id="eventEndDate"
            element="date"
            label="Fecha de final"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduzca una fecha válida."
            onInput={inputHandler}
          />
        </div>
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
        <p>
          Categoría (id):{" "}
          <span style={{ fontWeight: "300" }}>
            {formState.inputs.idCategory.value}
          </span>
        </p>
        <p>
          Código de empresa:{" "}
          <span style={{ fontWeight: "300" }}>
            {formState.inputs.idBusiness.value}
          </span>
        </p>
        <hr />
        <div>
          <Button type="submit" disabled={!formState.isValid}>
            AÑADIR
          </Button>
          <Button to="/user/admin/experiences">VOLVER</Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default ReactivateExperience;
