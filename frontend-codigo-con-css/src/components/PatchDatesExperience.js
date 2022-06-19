import { useState, useContext, useRef, useCallback, useEffect } from "react";

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

import "./PatchDatesExperience.css";

const PatchDatesExperience = ({ idExp }) => {
  const auth = useContext(AuthContext);
  const startTimeHourRef = useRef();
  const startTimeMinutesRef = useRef();
  const endTimeHourRef = useRef();
  const endTimeMinutesRef = useRef();
  const [datesExp, setDatesExp] = useState([]);
  const [dateSelected, setDateSelected] = useState();
  const [totalPlacesSel, setTotalPlacesSel] = useState();
  const [activateBtn, setActivatedBtn] = useState(false);
  const [isTotalPlacesShow, setIsTotalPlacesShow] = useState(false);
  const [isExpDateShow, setIsExpDateShow] = useState(false);
  const [showInputNewDate, setShowInputNewDate] = useState(false);
  const [showInputNewTotalPlaces, setShowInputNewTotalPlaces] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPatchOk, setIsPatchOk] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
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

  const fetchExperienceDates = useCallback(async () => {
    try {
      const response = await sendRequest(
        `http://localhost:3000/api/v1/experiences/${idExp}/dates`
      );

      const now = new Date().getTime();
      const datesFuture = response.filter(
        (date) => new Date(date.eventStartDate).getTime() > now
      );

      setDatesExp(datesFuture);
    } catch (err) {}
  }, [idExp, sendRequest]);

  useEffect(() => {
    fetchExperienceDates();
  }, [fetchExperienceDates]);

  const showInputNewDateHandler = () => {
    // setShowInputNewDate(true);
    setShowInputNewDate(!showInputNewDate);
    setShowInputNewTotalPlaces(false);
  };

  const submitDatesHandler = async (event) => {
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
      formDate.append("totalPlaces", totalPlacesSel);

      await sendRequest(
        `http://localhost:3000/api/v1/experiences/${idExp}/dates/${dateSelected}`,
        "PATCH",
        formDate,
        { Authorization: "Bearer " + auth.token }
      );
      setIsPatchOk(true);
    } catch (err) {}
    setShowInputNewDate(false);
    setIsExpDateShow(false);
  };

  const showDatesHandler = () => {
    setActivatedBtn(false);
    setIsExpDateShow(true);
    setIsTotalPlacesShow(false);
    setShowInputNewTotalPlaces(false);
  };

  const showtotalPlacesHandler = () => {
    setActivatedBtn(false);
    setIsTotalPlacesShow(true);
    setIsExpDateShow(false);
    setShowInputNewDate(false);
  };

  const showInputNewtotalPlacesHandler = () => {
    // setShowInputNewTotalPlaces(true);
    setShowInputNewTotalPlaces(!showInputNewTotalPlaces);
    setShowInputNewDate(false);
  };

  const submitTotalPlacesHandler = async (event) => {
    event.preventDefault();

    try {
      const formDate = new FormData();

      formDate.append("totalPlaces", totalPlacesSel);

      await sendRequest(
        `http://localhost:3000/api/v1/experiences/${idExp}/dates/${dateSelected}`,
        "PATCH",
        formDate,
        { Authorization: "Bearer " + auth.token }
      );
      setIsPatchOk(true);
    } catch (err) {}
    setIsTotalPlacesShow(false);
    setShowInputNewTotalPlaces(false);
  };

  const cancelModalHandler = () => {
    setShowModal(false);
    setIsPatchOk(false);
  };

  return (
    <div className="patch-dates-container">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}

      <div className="patch-dates-menu-btns">
        <Button type="button" onClick={showDatesHandler}>
          FECHAS
        </Button>
        <div className="patch-date-back-btn">
          <Button type="button" onClick={showtotalPlacesHandler}>
            TOTAL DE PLAZAS
          </Button>
        </div>
      </div>

      {isExpDateShow && (
        <div className="patch-experience-dates-container">
          <label
            className="patch-exp-label"
            htmlFor="date"
          >{`Selecciona fecha a modificar de la experiencia ${idExp}:  `}</label>
          <table className="patch-date-show-table">
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
                          onChange={(e) => {
                            setDateSelected(e.target.value);
                            setTotalPlacesSel(date.totalPlaces);
                            setActivatedBtn(true);
                          }}
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
            <Button
              type="button"
              onClick={showInputNewDateHandler}
              disabled={!activateBtn}
            >
              SELECCIONAR
            </Button>
          </div>
          <hr />
        </div>
      )}

      {isTotalPlacesShow && (
        <div className="patch-experience-dates-container">
          <label
            className="patch-exp-label"
            htmlFor="date"
          >{`Selecciona plazas a modificar de la experiencia ${idExp}:  `}</label>
          <table className="patch-date-show-table">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Plazas totales</th>
                <th>Fecha inicio</th>
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
                          onChange={(e) => {
                            setDateSelected(e.target.value);
                            setTotalPlacesSel(date.totalPlaces);
                            setActivatedBtn(true);
                          }}
                        />
                      </label>
                    </td>
                    <td>{date.totalPlaces}</td>
                    <td>
                      {formatDate(date.eventStartDate).day}/
                      {formatDate(date.eventStartDate).month}/
                      {formatDate(date.eventStartDate).year}{" "}
                      {formatDate(date.eventStartDate).time}h
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <Button
              type="button"
              onClick={showInputNewtotalPlacesHandler}
              disabled={!activateBtn}
            >
              SELECCIONAR
            </Button>
          </div>
          <hr />
        </div>
      )}

      {showInputNewDate && (
        <>
          <form className="patch-date-form" onSubmit={submitDatesHandler}>
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
            <div className="patch-date-btn-container">
              <Button type="submit">AÑADIR</Button>
              <div className="patch-date-back-btn">
                <Button to="/user/admin/experiences">VOLVER</Button>
              </div>
            </div>
          </form>
        </>
      )}

      {showInputNewTotalPlaces && (
        <div className="patch-experience-dates-container">
          <form onSubmit={submitTotalPlacesHandler}>
            <label>Total de plazas: </label>
            <input
              type="number"
              id="totalPlaces"
              name="totalPlaces"
              value={totalPlacesSel}
              onChange={(e) => setTotalPlacesSel(e.target.value)}
            />
            <div className="patch-date-btn-container">
              <Button type="submit">AÑADIR</Button>
              <div className="patch-date-back-btn">
                <Button to="/user/admin/experiences">VOLVER</Button>
              </div>
            </div>
          </form>
        </div>
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

      <Modal
        show={isPatchOk}
        onCancel={cancelModalHandler}
        footer={<Button to="/user/admin/experiences">OK</Button>}
      >
        Datos actualizados correctamente
      </Modal>
    </div>
  );
};

export default PatchDatesExperience;
