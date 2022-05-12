import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../ui/ErrorModal";
import Button from "../ui/FormElements/Button";
import LoadingSpinner from "../ui/LoadingSpinner";
import Modal from "../ui/Modal";

// import ExperienceList from "../components/ExperienceList";

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

    for (let i = 0; i < 4; i++) {
      expToShow.push(nextExp[i]);
    }

    setExperiences(expToShow);

    const orderResExpVisits = resExp.experiencesData
      .sort(function (expA, expB) {
        return expA.visits - expB.visits;
      })
      .reverse();
    // console.log("expVisit: ", expVisited);
    const expVisited4Most = [];

    for (let i = 0; i < 4; i++) {
      expVisited4Most.push(orderResExpVisits[i]);
    }
    setExpMostVisited(expVisited4Most);
  }, [sendRequest]);

  const fetchReviews = useCallback(async () => {
    const resRev = await sendRequest("http://localhost:3000/api/v1/reviews");
    // console.log("resREv: ", resRev);
    const bestReviews = resRev.reviewsData.filter((exp) => exp.rating >= 4);

    setReviews(bestReviews);
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
      {/* <ExperienceList experiences={experiences} /> */}
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
            idImg={experience.idImg}
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
        {expMostVisited.map((experience) => (
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
            idImg={experience.idImg}
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
      <div>{props.idImg}</div>
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
        <img src={props.avatar} alt="avatar user" />
      </div>
      <p>{props.comment}</p>
    </li>
  );
};
