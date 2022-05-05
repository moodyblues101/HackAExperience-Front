import { useState, useContext } from "react";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import Button from "../ui/FormElements/Button";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import Modal from "../ui/Modal";

const DeleteReviews = ({ reviews, urlPath }) => {
  const [deleted, setDeleted] = useState(false);
  const [checkedId, setCheckedId] = useState({ idReview: [] });
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    const { idReview } = checkedId;

    if (checked) {
      setCheckedId({
        idReview: [...idReview, value],
      });
    } else {
      setCheckedId({
        idReview: idReview.filter((event) => event !== value),
      });
    }
  };

  const sendReviewsToDelete = async (event) => {
    event.preventDefault();

    for (const key in checkedId.idReview) {
      await sendRequest(
        `http://localhost:3000/api/v1/reviews/${checkedId.idReview[key]}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
    }
    setDeleted(true);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <form onSubmit={sendReviewsToDelete}>
        <ul>
          {reviews.map((review) => {
            return (
              <li key={review.id}>
                <input
                  type="checkbox"
                  id={review.id}
                  name={review.id}
                  value={review.id}
                  onChange={handleChange}
                />
                <label htmlFor={review.id}>Id review: {review.id}</label>
                <p>idExperience: {review.idExperience}</p>
                <p>idUser: {review.idUser}</p>
                <p>comment: {review.comment}</p>
              </li>
            );
          })}
        </ul>
        <Button type="submit">BORRAR SELECCIONADAS</Button>
      </form>
      {deleted && (
        <Modal
          show={!error}
          footer={
            <Button to="/user/admin/manage-experience-comments">OK</Button>
          }
        >
          <p>Review(s) borrada(s) correctamente</p>
        </Modal>
      )}
    </>
  );
};

export default DeleteReviews;
