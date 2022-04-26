import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import ErrorModal from "../../ui/ErrorModal";
import LoadingSpinner from "../../ui/LoadingSpinner";
import ExperienceList from "../../components/ExperienceList";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../store/auth-context";

//  /user/:userId/experiences/enrolled

// SIN TERMINAR!!!!

const EnrolledExperiences = () => {
  const params = useParams();
  const auth = useContext(AuthContext);
  const [experiences, setExperiences] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchExperiences = async (userId) => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3000/api/v1/users/${userId}/bookings`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );

        // respuesta: [
        //   {
        //     id: 2,
        //     idUser: 3,
        //     idExperience: 2,
        //     createdAt: "2022-06-28T09:50:00.000Z",
        //     updatedAt: null,
        //     name: "exp2",
        //     city: "Santiago",
        //     price: "30.00",
        //   },
        //   {
        //     id: 6,
        //     idUser: 3,
        //     idExperience: 4,
        //     createdAt: "2022-06-28T10:00:00.000Z",
        //     updatedAt: null,
        //     name: "exp4",
        //     city: "Vigo",
        //     price: "15.00",
        //   },
        // ];

        //si no hay experiencias reservadas => INFORMAR

        //del sendrequest sacamos las id de las experiencias y luego hay que hacer un
        //get experience by id y continuamos:

        const loadedExperiences = [];

        for (const key in responseData) {
          loadedExperiences.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            date: responseData[key].eventStartDate,
          });
        }
        //filtrar resultado por fecha posterior a la del momento de la consulta
        const now = new Date();
        const experiencesEnrolled = loadedExperiences.filter(
          (experience) => loadedExperiences.date > now
        );

        setExperiences(experiencesEnrolled);
      } catch (err) {}
    };
    fetchExperiences(params.userId);
  }, [auth.token, params.userId, sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <h2>Experiencias en las que estas inscrito</h2>
      <ExperienceList experiences={experiences} />
    </React.Fragment>
  );
};

export default EnrolledExperiences;
