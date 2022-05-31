import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../ui/ErrorModal";
import Button from "../ui/FormElements/Button";
import LoadingSpinner from "../ui/LoadingSpinner";
import Modal from "../ui/Modal";
import ReactStars from "react-rating-stars-component";

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

    for (let i = 0; i < bestReviews.length && i < 3; i++) {
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

      <h2>Experiencias mejor valoradas</h2>
      <div className="landing-section-container">
        <ul>
          {experiences.map((exp) => (
            <li key={exp.id}>
              <Link to={`/experiences/${exp.id}`}>
                <div className="img-exp-container">
                  <img
                    src={`http://localhost:3000/experiences/${exp.id}/${exp.imgExp}`}
                    alt="experience"
                  />
                </div>
                <div>{exp.name}</div>
                <ReactStars
                  value={exp.rating}
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  edit={false}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <h2>Opininiones de nuestros clientes</h2>
      <div className="landing-reviews-container">
        <ul>
          {reviews.map((review) => (
            <Review
              key={review.id}
              avatar={review.profilePic}
              comment={review.comment}
            />
          ))}
        </ul>
      </div>

      <h2>Experiencias mas buscadas</h2>
      <div className="landing-section-container">
        <ul>
          {expMostVisited.map((exp) => (
            <li key={exp.id}>
              <Link to={`/experiences/${exp.id}`}>
                <div className="img-exp-container">
                  <img
                    src={`http://localhost:3000/experiences/${exp.id}/${exp.imgExp}`}
                    alt="experience"
                  />
                </div>
                <div>{exp.name}</div>

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
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="newsletter">
        <h3>
          Para elegir tu próxima experiencia, apúntate a nuestra newsletter
        </h3>
        <Button type="button" onClick={showModalHandler}>
          SÍ, QUIERO
        </Button>
      </div>

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

const Review = (props) => {
  return (
    <li className="landing-reviews-container-li">
      <div className="avatar-container">
        <img
          src={`http://localhost:3000/avatars/${props.avatar}`}
          alt="avatar user"
        />
      </div>
      <div className="review-list-comment">{props.comment}</div>
    </li>
  );
};
