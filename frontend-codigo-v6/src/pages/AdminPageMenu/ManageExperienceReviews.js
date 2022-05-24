import { useState } from "react";
import ReviewList from "../../components/ReviewList";

import "./ManageExperienceReviews";

//probar tambien a pedir id de experiencia e id de usuario para sacar un comentario en particular
//o dar a elegir al administrador como quiere hacerlo (idExp / idExp + idUser / idUSer)

const ManageExperienceReviews = () => {
  const [enteredId, setEnteredId] = useState("");
  const [enteredIdIsValid, setEnteredIdIsValid] = useState(true);
  const [enteredIdTouched, setEnteredIdTouched] = useState(false);
  const [didSubmitId, setDidSubmitId] = useState();

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  const SubmitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);
    setEnteredIdTouched(true);

    if (enteredId.trim === "") {
      setEnteredIdIsValid(false);
      return;
    }

    const getReviews = async (enteredId) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/experiences/${enteredId}/reviews`
        );

        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const data = await response.json();

        const transformedReviews = data.reviewData.map((review) => {
          return {
            id: review.id,
            idUser: review.idUser,
            comment: review.comment,
            rating: review.rating,
            createdAt: review.createdAt,
          };
        });

        setReviews(transformedReviews);
      } catch (error) {
        setHttpError(error.message);
        setDidSubmitId(false);
      }
      setIsLoading(false);
      setEnteredId("");
    };

    if (enteredIdIsValid) {
      getReviews(enteredId);
    }
  };

  let content = <p>Found no reviews</p>;

  if (reviews.length > 0) {
    content = <ReviewList reviews={reviews} />;
  }

  if (httpError) {
    content = <p>{httpError}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Gestionar comentarios</h2>
      {/* pedir id de experiencia */}
      <form onSubmit={SubmitHandler}>
        <label htmlFor="idExperience">Introduzca la id de la experiencia</label>
        <input
          type="text"
          id="idExperience"
          value={enteredId}
          onChange={(event) => setEnteredId(event.target.value)}
        />
        <button className="btn-rev">Obtener comentarios</button>
      </form>
      <section>{content}</section>
      {/* obtener comentarios con un campo de seleccion y boton de borrado (que pida confirmacion) */}
      {/* modal donde se acepte el borrado y */}
    </div>
  );
};

export default ManageExperienceReviews;
