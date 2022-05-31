import { useState, useEffect, useCallback, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import Button from "../ui/FormElements/Button";
import Modal from "../ui/Modal";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import ReactStars from "react-rating-stars-component";

import formatDate from "../util/formatDate";

import "./ExperiencePage.css";

const ExperiencePage = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const idExp = useParams().idExp;
  const [experience, setExperience] = useState({});
  const [dates, setDates] = useState([]);
  const [imgExperience, setImgExperience] = useState([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [avatars, setAvatars] = useState([]);
  const [noAvatars, setNoAvatars] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalShowUsers, setModalShowUsers] = useState(false);
  const [isShowModalMail, setIsShowModalMail] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchExperience = useCallback(async () => {
    const resExp = await sendRequest(
      `http://localhost:3000/api/v1/experiences/${idExp}`
    );

    const resDates = await sendRequest(
      `http://localhost:3000/api/v1/experiences/${idExp}/dates`
    );

    const now = new Date();
    const nextDates = resDates.filter(
      (exp) => new Date(exp.eventStartDate) > now
    );

    const formatNextDates = nextDates.map((date) => {
      const startDate = formatDate(date.eventStartDate);
      const endDate = formatDate(date.eventEndDate);
      return { startDate, endDate };
    });

    setDates(formatNextDates);

    const avgRatingExp = await sendRequest(
      `http://localhost:3000/api/v1/experiences/${idExp}/rating`
    );

    setExperience({ ...resExp, avgRatingExp: avgRatingExp.media });

    const expImg = await sendRequest(
      `http://localhost:3000/api/v1/experiences/${idExp}/images`
    );

    setImgExperience(expImg);

    const bookResponse = await fetch(
      `http://localhost:3000/api/v1/experiences/${idExp}/get-bookings`
    );

    if (!bookResponse.ok) {
      setNoAvatars(true);
    } else {
      const bookRes = await bookResponse.json();

      // console.log("bookRes: ", bookRes);

      const arrayProfilePics = bookRes.map((booking) => {
        return {
          avatar: booking.profilePic,
          bio: booking.bio,
          name: booking.name,
        };
      });
      // console.log("arrayProfilePics: ", arrayProfilePics);
      setAvatars(arrayProfilePics);
    }

    const response = await fetch(
      `http://localhost:3000/api/v1/experiences/${idExp}/reviews`
    );

    // console.log("response reviews: ", response);

    if (!response.ok) {
      setReviews([]);
    } else {
      const revRes = await response.json();
      setReviews(revRes);
    }
  }, [idExp, sendRequest]);

  useEffect(() => {
    fetchExperience();
  }, [fetchExperience]);

  const prevImg = (e) => {
    e?.stopPropagation();
    setCurrentImg(currentImg === 0 ? imgExperience.length - 1 : currentImg - 1);
  };

  //NEXTIMG NO FUNCIONA, CUANDO LLEGA A LA ULTIMA DESAPARECEN LAS FOTOS
  // const nextImg = (e) => {
  //   e?.stopPropagation();
  //   setCurrentImg(currentImg === 0 ? imgExperience.length - 1 : currentImg + 1);
  // };

  const bookingHandler = () => {
    if (auth.token) {
      history.push(`/booking/${idExp}`);
    } else {
      // history.push("/login");
      setShowModal(true);
    }
  };

  const cancelHandler = () => {
    setShowModal(false);
    setModalShowUsers(false);
    setIsShowModalMail(false);
  };

  const showUsersBooked = () => {
    setModalShowUsers(!modalShowUsers);
  };

  const showModalMail = () => {
    setIsShowModalMail(true);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <h3>{experience.name}</h3>
      <div className="exp-main">
        <List
          data={imgExperience}
          render={(image, index) => (
            <div key={image.id}>
              {index === currentImg && (
                <>
                  <div className="photos-container">
                    <div className="photos-container-item">
                      <img
                        src={`http://localhost:3000/experiences/${idExp}/${image.name}`}
                        alt="experience_image"
                      />
                    </div>

                    {imgExperience.length > 1 && (
                      <>
                        {/* <ChevronLeftIcon
                        className="slide-arrow-exp"
                        onClick={prevImg}
                      /> */}
                        <ChevronRightIcon
                          className="slide-arrow-exp"
                          // AQUI TENDRIA QUE SER NEXTIMG, PERO NO FUNCIONA:
                          onClick={prevImg}
                        />
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        />
        <div>
          <div>
            {experience.avgRatingExp && (
              <ReactStars
                value={+experience.avgRatingExp}
                count={5}
                size={24}
                activeColor="#ffd700"
                edit={false}
              />
            )}
          </div>
          <div className="desc-container">
            <span style={{ fontWeight: "300" }}>{experience.description}</span>
          </div>
          <div className="city-container">
            ¿Dónde?{" "}
            <span style={{ fontWeight: "300" }}>En {experience.city}.</span>
          </div>
          <div className="city-container">
            ¿Cuánto cuesta?{" "}
            <span style={{ fontWeight: "300" }}>{experience.price}€.</span>
          </div>
          <div className="business-container">
            Gestionado por {experience.businessName}.
          </div>
        </div>
      </div>
      <div>
        {dates.length === 0 ? (
          <p>No hay próximas fechas</p>
        ) : (
          <div>
            <p>¿Cuándo?</p>
            {dates.map((date) => {
              let dateData;
              if (date.startDate.day === date.endDate.day) {
                dateData = (
                  <p style={{ fontWeight: "300" }}>
                    El {date.startDate.day} de {date.startDate.month} del{" "}
                    {date.startDate.year} a las {date.startDate.time}h, hasta
                    las {date.endDate.time}h.
                  </p>
                );
              } else {
                dateData = (
                  <p style={{ fontWeight: "300" }}>
                    Del {date.startDate.day} de {date.startDate.month} del{" "}
                    {date.startDate.year} a las {date.startDate.time}h hasta{" "}
                    {date.endDate.day} a las {date.endDate.time}h.
                  </p>
                );
              }
              return dateData;
            })}
          </div>
        )}
      </div>

      <div>
        {experience.availablePlaces === 0 ? (
          <div>
            <p>No quedan plazas disponibles</p>
            <Button type="button" onClick={showModalMail}>
              Avísame cuando vuelva a estar disponible
            </Button>
          </div>
        ) : (
          <div>
            <Button type="button" onClick={bookingHandler}>
              RESERVAR
            </Button>
          </div>
        )}
        <div className="available-places">
          {experience.availablePlaces !== 0 && (
            <div>Quedan {experience.availablePlaces} plazas disponibles</div>
          )}

          <div className="avatars-booked">
            {avatars.length === 0 ? (
              <p>
                Aún no hay inscritos en esta experiencia. ¿Quieres ser el
                primero?
              </p>
            ) : (
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
            )}
          </div>
        </div>

        {auth.token && (
          <div className="btn-show-users">
            {!noAvatars && !modalShowUsers && (
              <Button type="button" onClick={showUsersBooked}>
                Mira quién está apuntado en esta experiencia
              </Button>
            )}
            {modalShowUsers && (
              <div>
                <ShowListUsersBooked avatars={avatars} />
                <Button type="button" onClick={showUsersBooked}>
                  OCULTAR
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {reviews.length !== 0 && (
        <div>
          <p>Opiniones de nuestros clientes:</p>
          <div className="exp-reviews-container">
            <ul>
              {reviews.map((rev) => (
                <li key={rev.id}>
                  <div>
                    <img
                      src={`http://localhost:3000/avatars/${rev.profilePic}`}
                      alt="user"
                    />
                    <p>{rev.comment}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

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

      {/* <Modal
        show={modalShowUsers}
        onCancel={cancelHandler}
        footer={<Button onClick={cancelHandler}>OK</Button>}
      >
        <ul className="modal-users">
          {avatars.map((user, index) => {
            return (
              <li key={user[index]}>
                <img
                  src={`http://localhost:3000/avatars/${user.avatar}`}
                  alt="user"
                />
                <div>{user.name}</div>
                <p>{user.bio}</p>
              </li>
            );
          })}
        </ul>
      </Modal> */}

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
          <label htmlFor="mail-user">Introduce tu mail para avisarte:</label>
          <input id="mail-user" type="text" />
        </div>
      </Modal>
    </>
  );
};

export default ExperiencePage;

const List = ({ data, render }) => {
  return <div>{data.map(render)}</div>;
};

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
        {avatars.map((user, index) => {
          return (
            <tr key={user[index]}>
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
