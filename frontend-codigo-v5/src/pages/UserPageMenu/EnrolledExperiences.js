// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// import ExperienceList from "../../components/ExperienceList";

const EnrolledExperiences = () => {
  // const params = useParams();
  // const [experiences, setExperiences] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [httpError, setHttpError] = useState();

  // useEffect(() => {
  //   const fetchExperiences = async (userId) => {
  //     const response = await fetch(); //falta endpoint

  //     if (!response.ok) {
  //       throw new Error("something went wrong");
  //     }

  //     const responseData = await response.json();

  //     const loadedExperiences = [];

  //     for (const key in responseData) {
  //       loadedExperiences.push({
  //         id: key,
  //         name: responseData[key].name,
  //         date: responseData[key].eventStartDate,
  //       });
  //     }

  //     //filtrar resultado por fecha posterior a la del momento de la consulta
  //     setExperiences(loadedExperiences);
  //     setIsLoading(false);
  //   };

  //   fetchExperiences(userId).catch((error) => {
  //     setIsLoading(false);
  //     setHttpError(error.message);
  //   });
  // }, []);

  // if (isLoading) {
  //   return (
  //     <section>
  //       <p>Loading...</p>
  //     </section>
  //   );
  // }

  // if (httpError) {
  //   return (
  //     <section>
  //       <p>{httpError}</p>
  //     </section>
  //   );
  // }

  return (
    <div>
      <h2>Experiencias en las que estas inscrito</h2>
      {/* <ExperienceList experiences={experiences} /> */}
    </div>
  );
};

export default EnrolledExperiences;
