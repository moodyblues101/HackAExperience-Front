import React, { useCallback, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import Button from "../ui/FormElements/Button";
import OptionsExperienceList from "./OptionsExperienceList";
import OptionAddReview from "./OptionAddReview";

const GetExperiencesBooked = ({ towards }) => {
  const params = useParams();
  const auth = useContext(AuthContext);
  const [experiences, setExperiences] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchExperiences = useCallback(
    async (userId) => {
      try {
        //consigo las reservas del usuario:
        const responseBookings = await sendRequest(
          `http://localhost:3000/api/v1/users/${userId}/bookings`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );

        if (responseBookings.length === 0) {
          return <p>No tienes experiencias reservadas</p>;
        }

        // const resBookingsTransformed = responseBookings.map((booking) => {
        //   return { ...booking, date: new Date(booking.eventStartDate) };
        // });

        const now = new Date();

        let gotExperiences;
        if (towards === "future") {
          gotExperiences = responseBookings.filter(
            (experience) => new Date(experience.eventStartDate) > now
          );
        } else {
          gotExperiences = responseBookings.filter(
            (experience) => new Date(experience.eventStartDate) < now
          );
        }

        setExperiences(gotExperiences);
      } catch (err) {}
    },
    [towards, auth.token, sendRequest]
  );

  useEffect(() => {
    fetchExperiences(params.userId);
  }, [params.userId, fetchExperiences]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {towards === "future" ? (
        <h2>Experiencias en las que estás inscrito/a</h2>
      ) : (
        <h2>Experiencias disfrutadas</h2>
      )}
      {towards === "past" && <OptionAddReview experiences={experiences} />}
      {towards === "future" && (
        <OptionsExperienceList experiences={experiences} />
      )}
      <div style={{ marginTop: "2rem" }}>
        <Button to={`/user/${auth.userId}/experiences/`}>VOLVER</Button>
      </div>
    </React.Fragment>
  );
};

export default GetExperiencesBooked;
