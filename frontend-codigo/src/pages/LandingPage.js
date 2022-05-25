import { useState, useEffect, useCallback } from "react";
<<<<<<< HEAD
=======
import { Link } from "react-router-dom";
>>>>>>> 289609200467aa78a5a42178316a21d57aae38c0

import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../ui/ErrorModal";
import Button from "../ui/FormElements/Button";
import LoadingSpinner from "../ui/LoadingSpinner";
import Modal from "../ui/Modal";
<<<<<<< HEAD

import "./LandingPage.css";
import ExperienceCard from '../components/ExperienceCard';
import Review from "../components/UserReviewCard";
=======
import ReactStars from "react-rating-stars-component";

import "./LandingPage.css";
>>>>>>> 289609200467aa78a5a42178316a21d57aae38c0

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

    const orderBestExp = resExp
      .sort(function (expA, expB) {
        return expA.rating - expB.rating;
      })
      .reverse();

    // console.log("orderBestExp: ", orderBestExp);

    const expToShow = [];

    for (let i = 0; i < orderBestExp.length && i < 4; i++) {
      const id = orderBestExp[i].id;
      const resImg = await sendRequest(
        `http://localhost:3000/api/v1/experiences/${id}/images`
      );

      expToShow.push({ ...orderBestExp[i], imgExp: resImg[0].name });
    }

    setExperiences(expToShow);

    const orderResExpVisits = resExp
      .sort(function (expA, expB) {
        return expA.visits - expB.visits;
      })
      .reverse();

    const expVisited4Most = [];

    for (let i = 0; i < orderResExpVisits.length && i < 4; i++) {
      const id = orderResExpVisits[i].id;
      const resImg = await sendRequest(
        `http://localhost:3000/api/v1/experiences/${id}/images`
      );

      expVisited4Most.push({
        ...orderResExpVisits[i],
        imgExp: resImg[0].name,
      });
    }

    setExpMostVisited(expVisited4Most);
  }, [sendRequest]);

  const fetchReviews = useCallback(async () => {
    const resRev = await sendRequest("http://localhost:3000/api/v1/reviews");
    const bestReviews = resRev.reviewsData.filter((exp) => exp.rating >= 4);
    const revToShow = [];

    for (let i = 0; i < bestReviews.length && i < 4; i++) {
      revToShow.push(bestReviews[i]);
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
<<<<<<< HEAD
      <h2>Experiencias mejor valoradas</h2>

      <div className="container">
        {experiences.map((exp) => (
          <ExperienceCard
            id={exp.id}
            imgExp={exp.imgExp}
            name={exp.name}
            rating={exp.rating}
          />
        ))}
      </div>

      <h2>Opininiones de nuestros clientes</h2>
      <div className="container">
=======
      <h1>Landing Page</h1>
      <h2>Experiencias mejor valoradas</h2>
      <ul>
        {experiences.map((exp) => (
          <li key={exp.id}>
            <img
              src={`http://localhost:3000/experiences/${exp.id}/${exp.imgExp}`}
              alt="experience"
            />
            <Link to={`/experiences/${exp.id}`}>{exp.name}</Link>

            <ReactStars
              value={exp.rating}
              count={5}
              size={24}
              activeColor="#ffd700"
              edit={false}
            />
          </li>
        ))}
      </ul>
      <h2>Opininiones de nuestros clientes</h2>
      <ul>
>>>>>>> 289609200467aa78a5a42178316a21d57aae38c0
        {reviews.map((review) => (
          <Review
            key={review.id}
            avatar={review.profilePic}
<<<<<<< HEAD
            name={review.name}
            comment={review.comment}
          />
        ))}
      </div>

      <h2>Experiencias mas buscadas</h2>
      <div className="container">
        {expMostVisited.map((exp) => (
          <ExperienceCard
            id={exp.id}
            imgExp={exp.imgExp}
            name={exp.name}
            rating={exp.rating}
          />
        ))}
      </div>
=======
            comment={review.comment}
          />
        ))}
      </ul>
      <h2>Experiencias mas buscadas</h2>
      <ul>
        {expMostVisited.map((exp) => (
          <li key={exp.id}>
            <img
              src={`http://localhost:3000/experiences/${exp.id}/${exp.imgExp}`}
              alt="experience"
            />
            <Link to={`/experiences/${exp.id}`}>{exp.name}</Link>
            {exp.rating !== null ? (
              <ReactStars
                value={exp.rating}
                count={5}
                size={24}
                activeColor="#ffd700"
                edit={false}
              />
            ) : (
              <div>Aún sin valorar</div>
            )}
          </li>
        ))}
      </ul>
>>>>>>> 289609200467aa78a5a42178316a21d57aae38c0
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

<<<<<<< HEAD
=======
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
>>>>>>> 289609200467aa78a5a42178316a21d57aae38c0
