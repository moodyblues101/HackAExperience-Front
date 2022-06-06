import { useState, useEffect, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import Button from "../ui/FormElements/Button";
import Modal from "../ui/Modal";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";

import "./ShowUsersBooked.css";

const ShowUsersBooked = ({ idExp, idDate, dates }) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [avatars, setAvatars] = useState([]);
  const [modalShowUsers, setModalShowUsers] = useState(false);
  const [isShowModalMail, setIsShowModalMail] = useState(false);
  const [showUsersBooked, setShowUsersBooked] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showModal, setShowModal] = useState(false);

  const dateData = dates.filter((date) => date.id === idDate);

  const fetchBookings = useCallback(async () => {
    setModalShowUsers(false);
    const bookResponse = await sendRequest(
      `http://localhost:3000/api/v1/bookings/dates/${idDate}`
    );

    if (bookResponse.length !== 0) {
      setModalShowUsers(true);
      const arrayProfilePics = bookResponse.map((booking) => {
        return {
          avatar: booking.profilePic,
          bio: booking.bio,
          name: booking.name,
        };
      });
      setAvatars(arrayProfilePics);
    }
  }, [idDate, sendRequest]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const showModalMail = () => {
    setIsShowModalMail(true);
  };

  const cancelHandler = () => {
    setShowModal(false);
    setIsShowModalMail(false);
  };

  const showUsersBookedHandler = () => {
    setShowUsersBooked(!showUsersBooked);
  };

  const bookingHandler = () => {
    if (auth.token) {
      history.push(`/booking/${idExp}/${idDate}`);
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div className="show-users-container">
        {dateData[0].availablePlaces === 0 ? (
          <div className="available-places">
            <p>No quedan plazas.</p>
            <Button type="button" onClick={showModalMail}>
              Avísame cuando vuelva a estar disponible
            </Button>
          </div>
        ) : (
          <div className="available-places">
            <div>
              <p>
                {`Quedan ${dateData[0].availablePlaces} plazas de un total de
          ${dateData[0].totalPlaces}.`}
              </p>
            </div>
            <div>
              <Button type="button" onClick={bookingHandler}>
                RESERVAR
              </Button>
            </div>
          </div>
        )}

        <div className="avatars-booked">
          {avatars.length !== 0 && modalShowUsers && (
            <div>
              <ul>
                {avatars.map((user, index) => {
                  return (
                    <li key={index}>
                      <img
                        src={`http://localhost:3000/avatars/${user.avatar}`}
                        alt="user"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <div>
          {avatars.length !== 0 && auth.token && modalShowUsers && (
            <div className="btn-show-users">
              <Button type="button" onClick={showUsersBookedHandler}>
                Mira quién está apuntado en esta experiencia
              </Button>
              {showUsersBooked && (
                <div>
                  <ShowListUsersBooked avatars={avatars} />
                  <Button type="button" onClick={showUsersBookedHandler}>
                    OCULTAR
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

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
      </div>
    </>
  );
};

export default ShowUsersBooked;

const ShowListUsersBooked = ({ avatars }) => {
  return (
    <table className="modal-users">
      <thead>
        <tr>
          <th></th>
          <th>Nombre</th>
          <th>Bio</th>
        </tr>
      </thead>
      <tbody>
        {avatars.map((user, i) => {
          return (
            <tr key={i}>
              <td>
                <img
                  src={`http://localhost:3000/avatars/${user.avatar}`}
                  alt="user"
                />
              </td>
              <td>{user.name}</td>
              <td>{user.bio}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
