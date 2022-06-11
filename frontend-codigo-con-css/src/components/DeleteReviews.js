import { useState, useContext } from "react";

import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import Button from "../ui/FormElements/Button";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import Modal from "../ui/Modal";

import "./DeleteReviews.css";

const DeleteReviews = ({ reviews, urlPath }) => {
  const [deleted, setDeleted] = useState(false);
  const [checkedId, setCheckedId] = useState({ idReview: [] });
  const [showButtonDel, setShowButtonDel] = useState(true);
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
      {reviews.length !== 0 && (
        <form className="delete-form" onSubmit={sendReviewsToDelete}>
          <table>
            <thead>
              <tr>
                <th>Id comentario</th>
                <th>Id experiencia</th>
                <th>Id usuario</th>
                <th>Comentario</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => {
                return (
                  <tr key={review.id}>
                    <td>
                      <input
                        type="checkbox"
                        id={review.id}
                        name={review.id}
                        value={review.id}
                        onChange={handleChange}
                      />
                      <label htmlFor={review.id}>{review.id}</label>
                    </td>
                    <td>{review.idExperience}</td>
                    <td>{review.idUser}</td>
                    <td>{review.comment}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Button type="submit">BORRAR SELECCIONADAS</Button>
        </form>
      )}
      {deleted && (
        <Modal
          show={!error}
          footer={<Button to="/user/admin/experiences">OK</Button>}
        >
          <p>Review(s) borrada(s) correctamente</p>
        </Modal>
      )}
    </>
  );
};

export default DeleteReviews;
