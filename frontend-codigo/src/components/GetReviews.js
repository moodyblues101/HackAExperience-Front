import { useContext, useState, useCallback } from "react";

import { useEffect } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import Button from "../ui/FormElements/Button";
import DeleteReviews from "./DeleteReviews";

const GetReviews = ({ idToGet, urlPath, action }) => {
  const [reviews, setReviews] = useState([]);
  const auth = useContext(AuthContext);
  const role = useContext(AuthContext).userRole;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchReviews = useCallback(async () => {
    let url;

    if (urlPath === "users") {
      url = `http://localhost:3000/api/v1/users/${idToGet}/reviews `;
    } else {
      url = `http://localhost:3000/api/v1/experiences/${idToGet}/reviews`;
    }

    const res = await sendRequest(url, "GET", null, {
      Authorization: "Bearer " + auth.token,
    });

    const reviewsMapped = res.map((rev) => {
      return {
        id: rev.id,
        idUser: rev.idUser,
        idExperience: rev.idExperience,
        comment: rev.comment,
      };
    });

    setReviews(reviewsMapped);

    if (action === "get") {
      const reviewsWithoutComment = reviewsMapped.filter(
        (rev) => rev.comment === null
      );

      setReviews(reviewsWithoutComment);
    }
  }, [idToGet, urlPath, action, auth.token, sendRequest]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div>
        <h2>El usuario con id {idToGet} tiene los siguientes comentarios:</h2>
        <DeleteReviews reviews={reviews} urlPath="users" />
      </div>

      {role === "administrador" ? (
        <Button to="/user/admin/manage-experience-comments">VOLVER</Button>
      ) : (
        <Button to={`/user/${idToGet}/experiences`}>VOLVER</Button>
      )}
    </>
  );
};

export default GetReviews;
