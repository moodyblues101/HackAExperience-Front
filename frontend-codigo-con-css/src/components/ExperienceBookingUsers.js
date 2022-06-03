import { useState, useEffect, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import Button from "../ui/FormElements/Button";
import Modal from "../ui/Modal";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import formatDate from "../util/formatDate";
import ShowUsersBooked from "./ShowUsersBooked";

import "./ExperienceBookingUsers.css";

const ExperienceBookingUsers = ({ idExp }) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [dates, setDates] = useState([]);
  const [idDateToSee, setIdDateToSee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [isShowModalMail, setIsShowModalMail] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchDates = useCallback(async () => {
    const resDates = await sendRequest(
      `http://localhost:3000/api/v1/experiences/${idExp}/dates`
    );

    const now = new Date();
    const nextDates = resDates.filter(
      (exp) => new Date(exp.eventStartDate) > now
    );

    // console.log("nextDates: ", nextDates);

    const formatNextDates = nextDates.map((date) => {
      const startDate = formatDate(date.eventStartDate);
      const endDate = formatDate(date.eventEndDate);

      let dateData;
      if (startDate.day === endDate.day) {
        dateData = `El ${startDate.day} de ${startDate.month} del ${startDate.year} a las
            ${startDate.time}h, hasta las ${endDate.time}h.`;
      } else {
        dateData = `Del ${startDate.day} de ${startDate.month} del ${startDate.year} a las
            ${startDate.time}h hasta ${endDate.day} a las ${endDate.time}h.`;
      }
      return {
        id: date.id,
        dateText: dateData,
        totalPlaces: date.totalPlaces,
        availablePlaces: date.availablePlaces,
      };
    });

    // console.log("formatNextDates: ", formatNextDates);

    setDates(formatNextDates);
  }, [idExp, sendRequest]);

  useEffect(() => {
    fetchDates();
  }, [fetchDates]);

  const showUsersHandler = (id) => {
    setIdDateToSee(id);
    setShowUsers(true);
  };

  const bookingHandler = () => {
    if (auth.token) {
      history.push(`/booking/${idExp}`);
    } else {
      setShowModal(true);
    }
  };

  const cancelHandler = () => {
    setShowModal(false);
    setIsShowModalMail(false);
  };

  const showModalMail = () => {
    setIsShowModalMail(true);
  };

  return (
    <>
      <div className="exp-book-user-container">
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <LoadingSpinner />}
        <div>
          {dates.length === 0 && (
            <div>
              <p>No hay próximas fechas</p>
              <Button type="button" onClick={showModalMail}>
                Avísame cuando vuelva a estar disponible
              </Button>
            </div>
          )}

          {dates.length !== 0 && (
            <div>
              <label htmlFor="dateToSee-field">¿Cuándo?</label>
              {dates.map((date) => (
                <div key={date.id}>
                  <input
                    className="exp-book-input"
                    key={date.id}
                    type="button"
                    value={`${date.dateText}`}
                    onClick={() => {
                      showUsersHandler(date.id);
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {dates.length !== 0 && !auth.token && (
            <p className="exp-book-p">
              Selecciona una fecha para saber cuántas plazas disponibles hay.
            </p>
          )}

          {dates.length !== 0 && auth.token && (
            <p className="exp-book-p">
              Selecciona una fecha y mira quién está inscrito
            </p>
          )}
          <div>
            {dates.length !== 0 && dates.availablePlaces !== 0 && (
              <div>
                <Button type="button" onClick={bookingHandler}>
                  RESERVAR
                </Button>
              </div>
            )}
          </div>
        </div>

        <div>
          {showUsers && <ShowUsersBooked idDate={idDateToSee} dates={dates} />}
        </div>

        <Modal
          show={showModal}
          onCancel={cancelHandler}
          footer={
            <div>
              <Button onClick={cancelHandler}>CANCELAR</Button>
              <Button to={`/login?experience=${idExp}`}>LOGIN</Button>
            </div>
          }
        >
          <p>Para poder reservar una experiencia tienes que iniciar sesión</p>
        </Modal>

        <Modal
          show={isShowModalMail}
          onCancel={cancelHandler}
          footer={
            <Button type="button" onClick={cancelHandler}>
              OK
            </Button>
          }
        >
          <div>
            <label style={{ marginRight: "1rem" }} htmlFor="mail-user">
              Introduce tu mail para avisarte:
            </label>
            <input id="mail-user" type="text" />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ExperienceBookingUsers;
