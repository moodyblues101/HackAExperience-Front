import { useCallback, useEffect, useState } from "react";

import ExperienceList from "../components/ExperienceList";

const ExperiencePage = () => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExperiencesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/v1/experiences/");

      if (!response.ok) {
        throw new Error("something went wrong");
      }

      const data = await response.json();

      console.log(data);

      const transformedExperiences = data.experiencesData.map(
        (experienceData) => {
          return {
            id: experienceData.idExperiences,
            name: experienceData.name,
            description: experienceData.description,
          };
        }
      );
      setExperiences(transformedExperiences);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchExperiencesHandler();
  }, [fetchExperiencesHandler]);

  let content = <p>Found no experiences</p>;

  if (experiences.length > 0) {
    content = <ExperienceList experiences={experiences} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Experiences Page</h1>
      {/* <section>
        <button onClick={fetchExperiencesHandler}>Fetch experiences</button>
      </section> */}
      <section>{content}</section>
    </div>
  );
};

export default ExperiencePage;
