import React, { useCallback, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import ErrorModal from "../../ui/ErrorModal";
import LoadingSpinner from "../../ui/LoadingSpinner";
import ExperienceList from "../../components/ExperienceList";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../store/auth-context";
import Button from "../../ui/FormElements/Button";

const EnrolledExperiences = () => {
  const params = useParams();
  const auth = useContext(AuthContext);
  const [experiences, setExperiences] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchExperiences = useCallback(
    async (userId) => {
      try {
        const responseBookings = await sendRequest(
          `http://localhost:3000/api/v1/users/${userId}/bookings`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );

        console.log("responseBookings: ", responseBookings);

        if (responseBookings.length === 0) {
          return <p>No tienes experiencias reservadas</p>;
        }

        const loadedExperiences = [];

        for (const key in responseBookings) {
          console.log("key: ", key);
          const bookedExperience = await sendRequest(
            `http://localhost:3000/api/v1/experiences/${responseBookings[key].idExperience}`,
            "GET",
            null,
            { Authorization: "Bearer " + auth.token }
          );

          console.log("bookedExperience: ", bookedExperience);

          loadedExperiences.push({
            id: key,
            name: bookedExperience.name,
            description: bookedExperience.description,
            date: new Date(bookedExperience.eventStartDate).getTime(),
          });
        }

        console.log("loadedExperiences: ", loadedExperiences);

        const now = new Date().getTime();
        console.log("now: ", now);

        const hora = loadedExperiences[0].date;
        console.log("hora: ", hora);

        const experiencesEnrolled = loadedExperiences.filter(
          (experience) => loadedExperiences.name === "exp2"
        );

        console.log("experiencesEnrolled: ", experiencesEnrolled);

        setExperiences(experiencesEnrolled);
      } catch (err) {}
    },
    [auth.token, sendRequest]
  );

  useEffect(() => {
    fetchExperiences(params.userId);
  }, [params.userId, fetchExperiences]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <h2>Experiencias en las que estas inscrito</h2>
      <ExperienceList experiences={experiences} />
      <Button to={`/user/${auth.userId}/experiences/`}>VOLVER</Button>
    </React.Fragment>
  );
};

export default EnrolledExperiences;
