import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../ui/ErrorModal";
import Button from "../ui/FormElements/Button";
import LoadingSpinner from "../ui/LoadingSpinner";
import Modal from "../ui/Modal";

import "./LandingPage.css";

const LandingPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [expMostVisited, setExpMostVisited] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showModalNewsletter, setShowModalNewsletter] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchExperiences = useCallback(async () => {
    const resExp = await sendRequest(
      "http://localhost:3000/api/v1/experiences"
    );
    // console.log("res: ", resExp);

    const now = new Date();

    const nextExp = resExp.experiencesData.filter(
      (exp) => new Date(exp.eventStartDate) > now
    );

    const expToShow = [];

    if (nextExp.length >= 4) {
      for (let i = 0; i < 4; i++) {
        const id = nextExp[i].id;
        const resImg = await sendRequest(
          `http://localhost:3000/api/v1/experiences/${id}/images`
        );

        // console.log("imagenes: ", resImg);
        expToShow.push({ ...nextExp[i], imgExp: resImg[0].name });
      }
    } else {
      for (let i = 0; i < nextExp.length; i++) {
        expToShow.push(nextExp[i]);
      }
    }

    // console.log("expToShow: ", expToShow);
    setExperiences(expToShow);

    const orderResExpVisits = resExp.experiencesData
      .sort(function (expA, expB) {
        return expA.visits - expB.visits;
      })
      .reverse();
    // console.log("expVisit: ", expVisited);
    const expVisited4Most = [];

    if (orderResExpVisits.length >= 4) {
      for (let i = 0; i < 4; i++) {
        const id = orderResExpVisits[i].id;
        const resImg = await sendRequest(
          `http://localhost:3000/api/v1/experiences/${id}/images`
        );

        expVisited4Most.push({
          ...orderResExpVisits[i],
          imgExp: resImg[0].name,
        });
      }
    } else {
      for (let i = 0; i < orderResExpVisits.length; i++) {
        expVisited4Most.push(orderResExpVisits[i]);
      }
    }
    setExpMostVisited(expVisited4Most);
  }, [sendRequest]);

  const fetchReviews = useCallback(async () => {
    const resRev = await sendRequest("http://localhost:3000/api/v1/reviews");
    // console.log("resREv: ", resRev);
    const bestReviews = resRev.reviewsData.filter((exp) => exp.rating >= 4);
    //TODO: QUE NO SE REPITA OPINION DE USUARIO ¿?
    const revToShow = [];

    if (bestReviews.length >= 4) {
      for (let i = 0; i < 4; i++) {
        revToShow.push(bestReviews[i]);
      }
    } else {
      for (let i = 0; i < bestReviews.length; i++) {
        revToShow.push(bestReviews[i]);
      }
    }

    setReviews(revToShow);
  }, [sendRequest]);

  useEffect(() => {
    fetchExperiences();
    fetchReviews();
  }, [fetchExperiences, fetchReviews]);

  const showModalHandler = () => {
    setShowModalNewsletter(true);
  };

  const cancelModal = () => {
    setShowModalNewsletter(false);
  };

  return (
    <div className="landing-page">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <h1>Landing Page</h1>
      <h2>Próximas experiencias</h2>
      <ul>
        {experiences.map((experience) => (
          <Experience
            key={experience.id}
            id={experience.id}
            name={experience.name}
            description={experience.description}
            city={experience.city}
            price={experience.price}
            eventStartDate={experience.eventStartDate}
            eventEndDate={experience.eventEndDate}
            // idBusiness={experience.idBusiness}
            businessName={experience.businessName}
            categoryName={experience.categoryName}
            imgExp={experience.imgExp}
            rating={experience.rating}
          />
        ))}
      </ul>
      <h2>Opininiones de nuestros clientes</h2>
      <ul>
        {reviews.map((review) => (
          <Review
            key={review.id}
            avatar={review.profilePic}
            comment={review.comment}
          />
        ))}
      </ul>
      <h2>Experiencias mas buscadas</h2>
      <ul>
        {expMostVisited.map((experience, index) => (
          <Experience
            key={index}
            id={experience.id}
            name={experience.name}
            description={experience.description}
            city={experience.city}
            price={experience.price}
            eventStartDate={experience.eventStartDate}
            eventEndDate={experience.eventEndDate}
            // idBusiness={experience.idBusiness}
            businessName={experience.businessName}
            categoryName={experience.categoryName}
            imgExp={experience.imgExp}
            rating={experience.rating}
          />
        ))}
      </ul>
      <h3>
        Para elegir tu próxima experiencia, apúntate a nuestra newsletter
        <Button type="button" onClick={showModalHandler}>
          SÍ, QUIERO
        </Button>
      </h3>
      <Modal
        show={showModalNewsletter}
        onCancel={cancelModal}
        footer={
          <div>
            <Button type="button" onClick={cancelModal}>
              CANCELAR
            </Button>
            <Button type="button" onClick={cancelModal}>
              OK
            </Button>
          </div>
        }
      >
        <label>Introduce tu email:</label>
        <input type="email" />
      </Modal>
    </div>
  );
};

export default LandingPage;

const Experience = (props) => {
  return (
    <li>
      <div>
        <img
          src={`http://localhost:3000/experiences/${props.id}/${props.imgExp}`}
          alt="experience"
        />
      </div>
      <h2>
        <Link to={`/experiences/${props.id}`}>{props.name}</Link>
      </h2>
      <h3>{props.description}</h3>
      <h3>{props.city}</h3>
      <h3>{props.price}</h3>
      <h3>{props.eventStartDate}</h3>
      <h3>{props.eventEndDate}</h3>
      <h3>{props.rating}</h3>
      <h3>{props.businessName}</h3>
      <h3>{props.categoryName}</h3>
    </li>
  );
};

const Review = (props) => {
  return (
    <li>
      <div>
        <img
          src={`http://localhost:3000/avatars/${props.avatar}`}
          alt="avatar user"
        />
      </div>
      <p>{props.comment}</p>
    </li>
  );
};
