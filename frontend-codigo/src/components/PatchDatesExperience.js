import { useState, useContext, useRef } from "react";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import { useForm } from "../hooks/form-hook";
import Input from "../ui/FormElements/Input";
import Button from "../ui/FormElements/Button";
import formatDate from "../util/formatDate";
import { VALIDATOR_REQUIRE } from "../util/validators";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import Modal from "../ui/Modal";

const PatchDatesExperience = () => {
  const auth = useContext(AuthContext);
  const startTimeHourRef = useRef();
  const startTimeMinutesRef = useRef();
  const endTimeHourRef = useRef();
  const endTimeMinutesRef = useRef();
  const [datesExp, setDatesExp] = useState([]);
  const [dateSelected, setDateSelected] = useState();
  const [isFieldsShow, setIsFieldShow] = useState(true);
  const [isExpDateShow, setIsExpDateShow] = useState(false);
  const [showInputNewDate, setShowInputNewDate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      idExperience: {
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
    },
    false
  );

  const isExpDateShowHandler = async () => {
    setIsFieldShow(false);
    try {
      const response = await sendRequest(
        `http://localhost:3000/api/v1/experiences/${formState.inputs.idExperience.value}/dates`
      );

      setDatesExp(response);
      setIsExpDateShow(true);
    } catch (err) {}
  };

  const showInputNewDateHandler = () => {
    setShowInputNewDate(true);
  };

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
      const formDate = new FormData();

      formDate.append("eventStartDate", startDateAndTime);
      formDate.append("eventEndDate", endDateAndTime);

      await sendRequest(
        `http://localhost:3000/api/v1/experiences/${formState.inputs.idExperience.value}/dates/${dateSelected}`,
        "PATCH",
        formDate,
        { Authorization: "Bearer " + auth.token }
      );
    } catch (err) {}
    setShowInputNewDate(false);
    setIsExpDateShow(false);
    setIsFieldShow(true);
  };

  const cancelModalHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {isFieldsShow && (
        <>
          <div>
            <Input
              id="idExperience"
              element="input"
              type="number"
              label="Introduce id de la experiencia a modificar:"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Por favor, introduzca una id válida."
              onInput={inputHandler}
            />
          </div>
          <Button type="button" onClick={isExpDateShowHandler}>
            MOSTRAR FECHAS
          </Button>
        </>
      )}

      {isExpDateShow && (
        <div>
          <label htmlFor="date">Selecciona fecha a modificar: </label>
          <table>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Fecha inicio</th>
                <th>Fecha final</th>
              </tr>
            </thead>
            <tbody>
              {datesExp.map((date, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <label>
                        <input
                          type="radio"
                          id={date.id}
                          name="date"
                          value={date.id}
                          onChange={(e) => setDateSelected(e.target.value)}
                        />
                      </label>
                    </td>
                    <td>
                      {formatDate(date.eventStartDate).day}/
                      {formatDate(date.eventStartDate).month}/
                      {formatDate(date.eventStartDate).year}{" "}
                      {formatDate(date.eventStartDate).time}h
                    </td>
                    <td>
                      {formatDate(date.eventEndDate).day}/
                      {formatDate(date.eventEndDate).month}/
                      {formatDate(date.eventEndDate).year}{" "}
                      {formatDate(date.eventEndDate).time}h
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <Button type="button" onClick={showInputNewDateHandler}>
              SELECCIONAR
            </Button>
          </div>
        </div>
      )}

      {showInputNewDate && (
        <>
          <form onSubmit={submitHandler}>
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
            <div>
              <Button type="submit" disabled={!formState.isValid}>
                AÑADIR
              </Button>
              <Button to="/user/admin/">VOLVER</Button>
            </div>
          </form>
        </>
      )}
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
    </>
  );
};

export default PatchDatesExperience;
