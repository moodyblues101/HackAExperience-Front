import { Link } from "react-router-dom";

import formatDate from "../util/formatDate";

const Experience = (props) => {
  const startDate =
    formatDate(props.eventStartDate).day +
    "/" +
    formatDate(props.eventStartDate).month +
    "/" +
    formatDate(props.eventStartDate).year;
  return (
    <li>
      <div>
        <img
          src={`http://localhost:3000/experiences/${props.id}/${props.imgExp}`}
          alt="experience"
        />
      </div>
      <h2>
        <Link to={`/experiences/${props.id}`}>{props.name}</Link>
      </h2>
      <h3>{props.city}</h3>
    </li>
  );
};

export default Experience;
