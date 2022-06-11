import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import { ChevronRightIcon } from "@heroicons/react/outline";
import ReactStars from "react-rating-stars-component";
import ExperienceBookingUsers from "../components/ExperienceBookingUsers";

import "./ExperiencePage.css";

const ExperiencePage = () => {
  const idExp = useParams().idExp;
  const [experience, setExperience] = useState({});
  const [imgExperience, setImgExperience] = useState([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [reviews, setReviews] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchExperience = useCallback(async () => {
    const resExp = await sendRequest(
      `http://localhost:3000/api/v1/experiences/${idExp}`
    );

    const avgRatingExp = await sendRequest(
      `http://localhost:3000/api/v1/experiences/${idExp}/rating`
    );
    setExperience({ ...resExp, avgRatingExp: avgRatingExp.media });

    const expImg = await sendRequest(
      `http://localhost:3000/api/v1/experiences/${idExp}/images`
    );
    setImgExperience(expImg);

    const responseReviews = await fetch(
      `http://localhost:3000/api/v1/experiences/${idExp}/reviews`
    );

    if (!responseReviews.ok) {
      setReviews([]);
    } else {
      const revRes = await responseReviews.json();
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
                        <ChevronRightIcon
                          className="slide-arrow-exp"
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
            <span className="light-text">{experience.description}</span>
          </div>
          <div className="city-container">
            ¿Dónde? <span className="light-text">En {experience.city}.</span>
          </div>
          <div className="city-container">
            ¿Cuánto cuesta?{" "}
            <span className="light-text">{experience.price}€.</span>
          </div>
          <div className="business-container">
            Gestionado por {experience.businessName}.
          </div>
        </div>
      </div>

      <div className="exp-bookings-container">
        <ExperienceBookingUsers idExp={idExp} />
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
                  </div>
                  <div className="exp-reviews-data">
                    <p className="light-text">{rev.userName}</p>
                    <p>{rev.comment}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ExperiencePage;

const List = ({ data, render }) => {
  return <div>{data.map(render)}</div>;
};
