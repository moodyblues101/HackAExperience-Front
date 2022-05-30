import { useState, useContext, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import Modal from "../ui/Modal";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import Card from "../ui/Card";
import Button from "../ui/FormElements/Button";
import formatDate from "../util/formatDate";

import "./OptionAddReview.css";

const OptionAddReview = ({ experiences }) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [sureModal, setSureModal] = useState(false);
  const [okAdded, setOkAdded] = useState(false);
  const [commentToAdd, setCommentToAdd] = useState("");
  const [showList, setShowList] = useState(false);
  const [idExpToComment, setIdExpToComment] = useState();
  const [arrayExpToShow, setArrayExpToShow] = useState([]);
  const [ratings, setRatings] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchUserReviews = useCallback(async () => {
    try {
      const userReviews = await sendRequest(
        `http://localhost:3000/api/v1/users/${auth.userId}/reviews`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );

      const resultArray = [];
      experiences.map((exp) => {
        const isInArrayRev = userReviews.some(
          (e) => exp.idExperience === e.idExperience
        );
        if (isInArrayRev) {
          resultArray.push({ ...exp, isNotCommented: false });
        } else {
          resultArray.push({ ...exp, isNotCommented: true });
        }
        return resultArray;
      });

      setArrayExpToShow(resultArray);
    } catch (error) {
      const resultArray = experiences.map((exp) => {
        return { ...exp, isNotCommented: true };
      });
      setArrayExpToShow(resultArray);
      setShowList(true);
    }
  }, [auth.userId, auth.token, experiences, sendRequest]);

  useEffect(() => {
    fetchUserReviews();
    setShowList(true);
  }, [fetchUserReviews]);

  const reviewFormHandler = (id) => {
    setSureModal(true);
    setIdExpToComment(id);
    setShowList(false);
  };

  const cancelActionHandler = () => {
    setSureModal(false);
    history.push(`/user/${auth.userId}/experiences`);
  };

  const createReview = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:3000/api/v1/experiences/${idExpToComment}/reviews`,
        "POST",
        JSON.stringify({
          comment: commentToAdd,
          rating: ratings,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setOkAdded(true);
    } catch (err) {
      setSureModal(false);
    }
  };

  const cancelOkHandler = () => {
    setSureModal(false);
    setOkAdded(false);
    history.push(`/user/${auth.userId}/experiences`);
  };

  const ratingChanged = (newRating) => {
    setRatings(newRating);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {showList && (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {arrayExpToShow.map((exp) => {
              return (
                <tr key={exp.id}>
                  <td>
                    <label htmlFor={exp.id}>{exp.name}</label>
                  </td>
                  <td>{exp.description}</td>
                  <td>
                    <DateExperience date={exp.eventStartDate} />
                  </td>
                  <td>
                    <div className="btn-container">
                      <div>
                        <Button to={"/experiences"}>VER</Button>
                      </div>
                      {exp.isNotCommented && (
                        <div>
                          <Button
                            type="button"
                            onClick={() => {
                              reviewFormHandler(exp.idExperience);
                            }}
                          >
                            AÑADIR VALORACIÓN
                          </Button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {sureModal && (
        <Card>
          <form onSubmit={createReview}>
            <label htmlFor="comment">
              Introduzca su opinión sobre la experiencia:
            </label>
            <input
              type="text"
              value={commentToAdd}
              onChange={(e) => setCommentToAdd(e.target.value)}
              // onBlur={() => setIsTouched(true)}
            />

            <ReactStars
              id="rating"
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <Button type="submit" onClick={cancelActionHandler}>
              CANCELAR
            </Button>
            <Button type="submit">AÑADIR</Button>
          </form>
        </Card>
      )}

      <Modal
        show={okAdded}
        onCancel={cancelOkHandler}
        footer={
          <Button type="button" onClick={cancelOkHandler}>
            OK
          </Button>
        }
      >
        <p>Comentario añadido</p>
      </Modal>
    </>
  );
};

export default OptionAddReview;

const DateExperience = ({ date }) => {
  const newDate = formatDate(date);

  return (
    <div>
      <div>
        {newDate.day} {newDate.month} {newDate.year} {newDate.time}
      </div>
    </div>
  );
};
