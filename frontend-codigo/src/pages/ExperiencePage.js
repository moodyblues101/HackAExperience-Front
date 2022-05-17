import { useState, useEffect, useCallback, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import Button from "../ui/FormElements/Button";
import Modal from "../ui/Modal";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

import formatDate from "../util/formatDate";

import "./ExperiencePage.css";

const ExperiencePage = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const idExp = useParams().idExp;
  const [experience, setExperience] = useState({});
  const [startDateTime, setStartDateTime] = useState({});
  const [endDateTime, setEndDateTime] = useState({});
  const [imgExperience, setImgExperience] = useState([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [avatars, setAvatars] = useState([]);
  const [noAvatars, setNoAvatars] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [noReviews, setNoReviews] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalShowUsers, setModalShowUsers] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchExperience = useCallback(async () => {
    const resExp = await sendRequest(
      `http://localhost:3000/api/v1/experiences/${idExp}`
    );

    // console.log("resExp: ", resExp);

    //  y el numero de plazas disponibles
    //avisos de no quedan plazas (si no quedan plazas, inhabilitar boton de reservar) y

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
        return { avatar: booking.profilePic, bio: booking.bio };
      });
      // console.log("arrayProfilePics: ", arrayProfilePics);
      setAvatars(arrayProfilePics);
    }

    const response = fetch(
      `http://localhost:3000/api/v1/experiences/${idExp}/reviews`
    );

    if (!response.ok) {
      setNoReviews(true);
    } else {
      const revRes = await response.json();

      setReviews(revRes);
    }

    const startDate = formatDate(experience.eventStartDate);
    // console.log("startDate: ", startDate);
    setStartDateTime(startDate);

    const endDate = formatDate(experience.eventEndDate);
    setEndDateTime(endDate);
  }, [idExp, experience.eventStartDate, experience.eventEndDate, sendRequest]);

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
  };

  const showUsersBooked = () => {
    setModalShowUsers(true);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {/* <p>{`Categoria/${experience.name}`}</p> */}
      <h3>{experience.name}</h3>
      <div>
        {/* <div>image</div> */}
        <List
          data={imgExperience}
          render={(image, index) => (
            <div key={image.id}>
              {index === currentImg && (
                <>
                  <img
                    src={`http://localhost:3000/experiences/${idExp}/${image.name}`}
                    alt="experience_image"
                  />
                  {imgExperience.length > 1 && (
                    <>
                      <ChevronLeftIcon
                        className="slide-arrow-exp"
                        onClick={prevImg}
                      />
                      <ChevronRightIcon
                        className="slide-arrow-exp"
                        // AQUI TENDRIA QUE SER NEXTIMG, PERO NO FUNCIONA:
                        onClick={prevImg}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          )}
        />
        <div>VALORACION: </div>
        {experience.avgRatingExp
          ? `${experience.avgRatingExp}`
          : "Esta experiencia aun no ha sido valorada"}
        <div>DESCRIPCION: {experience.description}</div>
      </div>
      <div>
        <p>¿Cuándo y dónde?</p>
        <p>
          {startDateTime.day} {startDateTime.month} {startDateTime.year} a las{" "}
          {startDateTime.time}h en {experience.city}. Termina a las{" "}
          {endDateTime.time}h.
        </p>
        <p>Gestionado por {experience.businessName}</p>
      </div>

      <div>
        {experience.availablePlaces === 0 ? (
          <p>No quedan plazas disponibles</p>
        ) : (
          <div>
            <Button type="button" onClick={bookingHandler}>
              RESERVAR
            </Button>
          </div>
        )}
        {auth.token && (
          <div>
            {experience.availablePlaces !== 0 && (
              <div>Quedan {experience.availablePlaces} plazas disponibles</div>
            )}
            {!noAvatars && (
              <button onClick={showUsersBooked}>
                Mira quién está apuntado en esta experiencia:
              </button>
            )}
          </div>
        )}
        {/* <div>avatares de inscritos</div> */}
        {noAvatars ? (
          <p>
            Aún no hay inscritos en esta experiencia. ¿Quieres ser el primero?
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
      {noReviews ? (
        <p>Todavía no hay opiniones sobre esta experiencia.</p>
      ) : (
        <div>
          <div>Opiniones de nuestros clientes:</div>
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
      )}
      <Modal
        show={showModal}
        onCancel={cancelHandler}
        footer={
          <div>
            <Button onClick={cancelHandler}>CANCELAR</Button>
            <Button to="/login">LOGIN</Button>
          </div>
        }
      >
        <p>Para poder reservar una experiencia tienes que iniciar sesión</p>
      </Modal>
      <Modal
        show={modalShowUsers}
        onCancel={cancelHandler}
        footer={<Button onClick={cancelHandler}>OK</Button>}
      >
        <ul>
          {avatars.map((user, index) => {
            return (
              <li key={user[index]}>
                <img
                  src={`http://localhost:3000/avatars/${user.avatar}`}
                  alt="user"
                />
                <p>{user.bio}</p>
              </li>
            );
          })}
        </ul>
      </Modal>
    </>
  );
};

export default ExperiencePage;

const List = ({ data, render }) => {
  return <div>{data.map(render)}</div>;
};
