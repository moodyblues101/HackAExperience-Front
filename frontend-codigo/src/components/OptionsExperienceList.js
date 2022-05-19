import Button from "../ui/FormElements/Button";
import Modal from "../ui/Modal";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import formatDate from "../util/formatDate";

const OptionsExperienceList = ({ experiences }) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [sureModal, setSureModal] = useState(false);
  const [okDelete, setOkDelete] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const cancelExpHandler = (id) => {
    setSureModal(true);
    setBookingToDelete(id);
  };

  const cancelActionHandler = () => {
    setSureModal(false);
    history.push(`/user/${auth.userId}/experiences/enrolled`);
  };

  const deleteBooking = async (id) => {
    // console.log(`cancelar reserva ${id}`);
    try {
      await sendRequest(
        `http://localhost:3000/api/v1/bookings/${id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      setOkDelete(true);
    } catch (err) {
      setSureModal(false);
    }
  };

  const cancelOkHandler = () => {
    setSureModal(false);
    setOkDelete(false);
    history.push(`/user/${auth.userId}/experiences`);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <ul>
        {experiences.map((exp) => {
          return (
            <li key={exp.id}>
              <label htmlFor={exp.id}>Nombre: {exp.name}</label>
              <p>Descripción: {exp.description}</p>
              <p>Fecha de la experiencia:</p>
              <DateExperience date={exp.eventStartDate} />
              <p>Fecha de la reserva:</p>
              <DateExperience date={exp.createdAt} />
              <div>
                <Button to={`/experiences/${exp.idExperience}`}>VER</Button>
                <Button
                  type="button"
                  onClick={() => {
                    cancelExpHandler(exp.id);
                  }}
                >
                  CANCELAR RESERVA
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
      <Modal
        show={sureModal}
        onCancel={cancelActionHandler}
        header="CANCELACIÓN"
        footer={
          <div>
            <Button type="button" onClick={cancelActionHandler}>
              VOLVER
            </Button>
            <Button
              type="button"
              onClick={() => deleteBooking(bookingToDelete)}
            >
              CANCELAR RESERVA
            </Button>
          </div>
        }
      >
        <p>¿Estás seguro de que quieres cancelar la reserva?</p>
        <p>Una vez cancelada, no podrás volver atrás</p>
      </Modal>
      <Modal
        show={okDelete}
        onCancel={cancelOkHandler}
        footer={
          <Button type="button" onClick={cancelOkHandler}>
            OK
          </Button>
        }
      >
        <p>Reserva cancelada correctamente</p>
      </Modal>
    </>
  );
};

export default OptionsExperienceList;

const DateExperience = ({ date }) => {
  const newDate = formatDate(date);

  return (
    <div>
      <div>
        {newDate.day} {newDate.month} {newDate.year} {newDate.time}
      </div>
    </div>
  );
};
