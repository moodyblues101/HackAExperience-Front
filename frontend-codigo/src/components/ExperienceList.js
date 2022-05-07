import { useHistory, useLocation } from "react-router-dom";

import Button from "../ui/FormElements/Button";
import Experience from "./Experience";

const sortExperiences = (experiences, ascending) => {
  return experiences.sort((expA, expB) => {
    if (ascending) {
      return expA.price > expB.price ? 1 : -1;
    } else {
      return expA.price < expB.price ? 1 : -1;
    }
  });
};

const ExperienceList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortAscending = queryParams.get("sort") === "asc";

  const sortedExperiences = sortExperiences(props.experiences, isSortAscending);

  const changeSortHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortAscending ? "desc" : "asc"}`,
    });
  };

  return (
    <>
      <div>
        <Button type="button" onClick={changeSortHandler}>
          {isSortAscending ? "De mayor a menor" : "De menor a mayor"}
        </Button>
      </div>
      <ul>
        {sortedExperiences.map((experience) => (
          <Experience
            key={experience.id}
            name={experience.name}
            description={experience.description}
            city={experience.city}
            price={experience.price}
            eventStartDate={experience.eventStartDate}
            eventEndDate={experience.eventEndDate}
            idBusiness={experience.idBusiness}
          />
        ))}
      </ul>
    </>
  );
};

export default ExperienceList;
