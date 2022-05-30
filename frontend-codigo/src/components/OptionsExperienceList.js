import Button from "../ui/FormElements/Button";
import Modal from "../ui/Modal";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import formatDate from "../util/formatDate";

import "./OptionAddReview.css";

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
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha experiencia</th>
            <th>Fecha reserva</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((exp) => {
            return (
              <tr key={exp.id}>
                <td>
                  <label htmlFor={exp.id}>{exp.name}</label>
                </td>
                <td>{exp.description}</td>
                <td>
                  <DateExperience date={exp.eventStartDate} />
                </td>
                <td>
                  <DateExperience date={exp.createdAt} />
                </td>
                <td>
                  <div className="btn-container">
                    <div>
                      <Button to={`/experiences/${exp.idExperience}`}>
                        VER
                      </Button>
                    </div>
                    <div>
                      <Button
                        type="button"
                        onClick={() => {
                          cancelExpHandler(exp.id);
                        }}
                      >
                        CANCELAR RESERVA
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
