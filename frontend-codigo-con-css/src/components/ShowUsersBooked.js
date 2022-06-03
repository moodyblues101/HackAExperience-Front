import { useState, useEffect, useCallback, useContext } from "react";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import Button from "../ui/FormElements/Button";
import Modal from "../ui/Modal";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";

import "./ShowUsersBooked.css";

const ShowUsersBooked = ({ idDate, dates }) => {
  const auth = useContext(AuthContext);
  const [avatars, setAvatars] = useState([]);
  const [modalShowUsers, setModalShowUsers] = useState(false);
  const [isShowModalMail, setIsShowModalMail] = useState(false);
  const [showUsersBooked, setShowUsersBooked] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const dateData = dates.filter((date) => date.id === idDate);

  const fetchBookings = useCallback(async () => {
    setModalShowUsers(false);
    const bookResponse = await sendRequest(
      `http://localhost:3000/api/v1/bookings/dates/${idDate}`
    );

    // console.log("bookResponse: ", bookResponse);

    if (bookResponse.length !== 0) {
      setModalShowUsers(true);
      const arrayProfilePics = bookResponse.map((booking) => {
        return {
          avatar: booking.profilePic,
          bio: booking.bio,
          name: booking.name,
        };
      });
      //   console.log("arrayProfilePics: ", arrayProfilePics);
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
    setIsShowModalMail(false);
  };

  const showUsersBookedHandler = () => {
    setShowUsersBooked(!showUsersBooked);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div className="show-users-container">
        {dateData.availablePlaces === 0 ? (
          <div className="available-places">
            <p>No quedan plazas disponibles</p>
            <Button type="button" onClick={showModalMail}>
              Avísame cuando vuelva a estar disponible
            </Button>
          </div>
        ) : (
          <div className="available-places">
            <p>
              {`Quedan ${dateData[0].availablePlaces} plazas de un total de
          ${dateData[0].totalPlaces}.`}
            </p>
          </div>
        )}

        <div className="avatars-booked">
          {avatars.length !== 0 && modalShowUsers && (
            <div>
              <ul>
                {avatars.map((user, index) => {
                  return (
                    <li key={user[index]}>
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
            <tr key={user[i]}>
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