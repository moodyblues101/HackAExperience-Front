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
  const idDate = useParams().idDate;
  const [startDate, setStartDate] = useState("");
  const [availablePlaces, setAvailablePlaces] = useState(0);
  const [bookingOk, setBookingOk] = useState(false);
  const [showModalNotPlaces, setShowModalNotPlaces] = useState(false);
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

  const fetchDataDate = useCallback(async () => {
    const dataDate = await sendRequest(
      `http://localhost:3000/api/v1/experiences/${idExp}/dates/${idDate}`,
      "GET",
      null,
      { Authorization: "Bearer " + auth.token }
    );

    const dataStart = formatDate(dataDate[0].eventStartDate);
    setStartDate(dataStart);

    const dateAvailablePlaces = dataDate[0].availablePlaces;
    setAvailablePlaces(dateAvailablePlaces);
  }, [idExp, idDate, auth.token, sendRequest]);

  useEffect(() => {
    fetchDataDate();
  }, [fetchDataDate]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const amountBookings = formState.inputs.amount.value;

    if (amountBookings > availablePlaces) {
      setShowModalNotPlaces(true);
      return;
    }

    try {
      for (let i = 1; i <= amountBookings; i++) {
        await sendRequest(
          `http://localhost:3000/api/v1/experiences/${idExp}/bookings`,
          "POST",
          JSON.stringify({ idDate: idDate }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
      }
      setBookingOk(true);
    } catch (err) {}
  };

  const cancelHandler = () => {
    setShowModalNotPlaces(false);
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
        <div style={{ marginBottom: "2rem" }}>
          Fecha seleccionada: {startDate.day}/{startDate.month}/{startDate.year}{" "}
          - {startDate.time}h
        </div>

        <Button to={`/experiences/${idExp}`}>CANCELAR</Button>
        <Button type="submit">RESERVAR</Button>
      </form>

      <Modal
        show={showModalNotPlaces}
        footer={
          <Button type="button" onClick={cancelHandler}>
            OK
          </Button>
        }
      >
        <p>
          Lo sentimos, pero no solo quedan {availablePlaces} plazas disponibles
        </p>
      </Modal>

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
