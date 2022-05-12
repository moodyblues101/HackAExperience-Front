import { useState, useEffect, useCallback, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import Button from "../ui/FormElements/Button";
import Modal from "../ui/Modal";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

import "./ExperiencePage.css";

const ExperiencePage = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const idExp = useParams().idExp;
  const [experience, setExperience] = useState({});
  const [imgExperience, setImgExperience] = useState([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchExperience = useCallback(async () => {
    const resExp = await sendRequest(
      `http://localhost:3000/api/v1/experiences/${idExp}`
    );

    //EN ESTA RESPUESTA FALTA IMAGENES DE EXPERIENCIA, RATING, NOMBRE DE LA EMPRESA,
    //FECHA DEL EVENTO

    //tambien falta avatares de usuarios y el numero de plazas disponibles
    //avisos de no quedan plazas (si no quedan plazas, inhabilitar boton de reservar) y de
    //no hay opiniones aun

    setExperience(resExp);

    const expImg = await sendRequest(
      `http://localhost:3000/api/v1/experiences/${idExp}/images`
    );

    setImgExperience(expImg);
  }, [idExp, sendRequest]);

  useEffect(() => {
    fetchExperience();
  }, [fetchExperience]);

  const prevImg = (e) => {
    e?.stopPropagation();
    setCurrentImg(currentImg === 0 ? imgExperience.length - 1 : currentImg - 1);
  };

  const nextImg = (e) => {
    e?.stopPropagation();
    setCurrentImg(currentImg === 0 ? imgExperience.length - 1 : currentImg + 1);
  };

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
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {/* <p>{`Categoria/${experience.name}`}</p> */}
      <h3>{experience.name}</h3>
      <div>
        <div>image</div>
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
                        onClick={nextImg}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          )}
        />
        <div>rating</div>
        <div>{experience.description}</div>
      </div>
      <div>
        <div>
          <Button type="button" onClick={bookingHandler}>
            RESERVAR
          </Button>
        </div>
        {auth.token && (
          <div>
            <div>Quedan x plazas disponibles</div>
            <div>Mira quién está apuntado en esta experiencia:</div>
          </div>
        )}
        <div>avatares de inscritos</div>
      </div>
      <div>Opiniones de nuestros clientes:</div>
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
    </>
  );
};

export default ExperiencePage;

const List = ({ data, render }) => {
  return <div>{data.map(render)}</div>;
};
