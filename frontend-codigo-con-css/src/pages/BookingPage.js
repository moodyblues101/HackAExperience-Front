import { useState, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";

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
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const eventStartDate = query.get("eventStartDate");
  const [bookingOk, setBookingOk] = useState(false);
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

  const formatedDate = formatDate(eventStartDate);

  const submitHandler = async (event) => {
    event.preventDefault();

    const amountBookings = formState.inputs.amount.value;

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
          Fecha seleccionada: {formatedDate.day}/{formatedDate.month}/
          {formatedDate.year} - {formatedDate.time}h
        </div>

        <Button to={`/experiences/${idExp}`}>CANCELAR</Button>
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
