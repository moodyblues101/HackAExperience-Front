import { useContext, useState, useCallback } from "react";

import { useEffect } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import Button from "../ui/FormElements/Button";
import DeleteReviews from "./DeleteReviews";

const GetReviews = ({ idToGet, urlPath }) => {
  const [reviews, setReviews] = useState([]);
  const auth = useContext(AuthContext);
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

    // let transformedReviews;

    // if (urlPath === "users") {
    //   transformedReviews = reviewsMapped.map((rev, i) => {
    //     return {
    //       id: reviewsMapped[i].id,
    //       idExperience: reviewsMapped[i].idExperience,
    //       comment: reviewsMapped[i].comment,
    //     };
    //   });
    // } else {
    //   transformedReviews = reviewsMapped.map((rev, i) => {
    //     return {
    //       id: reviewsMapped[i].id,
    //       idUser: reviewsMapped[i].idUser,
    //       comment: reviewsMapped[i].comment,
    //     };
    //   });
    // }
    // setReviews(transformedReviews);
  }, [idToGet, urlPath, auth.token, sendRequest]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <h2>El usuario con id {idToGet} tiene los siguientes comentarios:</h2>
      <DeleteReviews reviews={reviews} />
      <Button to="/user/admin/manage-experience-comments">VOLVER</Button>
    </>
  );
};

export default GetReviews;
