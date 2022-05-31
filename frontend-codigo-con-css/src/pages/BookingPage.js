import { useState, useContext, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../store/auth-context";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import Input from "../ui/FormElements/Input";
import {
  VALIDATOR_MAX,
  VALIDATOR_MIN,
  VALIDATOR_REQUIRE,
} from "../util/validators";
import Button from "../ui/FormElements/Button";
import Modal from "../ui/Modal";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import formatDate from "../util/formatDate";

const BookingPage = () => {
  const auth = useContext(AuthContext);
  const idUser = useContext(AuthContext).userId;
  const idExp = useParams().idExp;
  const [bookingOk, setBookingOk] = useState(false);
  const [dates, setDates] = useState([]);
  const [dateSelected, setDateSelected] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      amount: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const fetchDates = useCallback(async () => {
    const datesExp = await sendRequest(
      `http://localhost:3000/api/v1/experiences/${idExp}/dates`
    );

    // console.log("datesExp: ", datesExp);

    const datesFormatExp = [];

    for (const date of datesExp) {
      const startDate = formatDate(date.eventStartDate);
      const endDate = formatDate(date.eventEndDate);
      datesFormatExp.push({
        ...date,
        eventStartDate: startDate,
        eventEndDate: endDate,
      });
    }
    // console.log("dates format: ", datesFormatExp);

    setDates(datesFormatExp);
  }, [idExp, sendRequest]);

  useEffect(() => {
    fetchDates();
  }, [fetchDates]);

  const submitHandler = async (event) => {
    event.preventDefault();

    // console.log("date selected: ", dateSelected);
    const amountBookings = formState.inputs.amount.value;

    try {
      for (let i = 1; i <= amountBookings; i++) {
        // console.log("idDAte: ", dateSelected);
        await sendRequest(
          `http://localhost:3000/api/v1/experiences/${idExp}/bookings`,
          "POST",
          JSON.stringify({ idDate: dateSelected }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
      }
      setBookingOk(true);
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <p>RESERVAR</p>
      {isLoading && <LoadingSpinner />}
      <form onSubmit={submitHandler}>
        <div style={{ width: "15rem" }}>
          <Input
            id="amount"
            element="input"
            type="number"
            label="Introduce el número de reservas que quieres:"
            validators={[
              VALIDATOR_REQUIRE(),
              VALIDATOR_MIN(1),
              VALIDATOR_MAX(50),
            ]}
            errorText="Introduce una cantidad entre 1 y 50"
            onInput={inputHandler}
            initialValue="1"
            initialValid={true}
          />
        </div>
        <div>
          <label htmlFor="date">Selecciona una fecha: </label>
          <table>
            <thead>
              <tr>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {dates.map((date) => {
                return (
                  <tr>
                    <td>
                      <label>
                        <input
                          type="radio"
                          id={date.id}
                          name="date"
                          value={date.id}
                          onChange={(e) => setDateSelected(e.target.value)}
                        />{" "}
                        {date.eventStartDate.day}/{date.eventStartDate.month}/
                        {date.eventStartDate.year} a las{" "}
                        {date.eventStartDate.time}h
                      </label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Button type="submit">RESERVAR</Button>
      </form>
      <Modal
        show={bookingOk}
        footer={
          <div>
            <Button to={`/user/${idUser}/experiences/enrolled`}>
              MIS RESERVAS
            </Button>
            <Button to="/">INICIO</Button>
          </div>
        }
      >
        <p>Reserva realizada correctamente</p>
      </Modal>
    </>
  );
};

export default BookingPage;
