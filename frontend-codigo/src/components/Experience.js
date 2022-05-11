import { Link } from "react-router-dom";

const Experience = (props) => {
  return (
    <li>
      <h2>
        <Link to={`/experiences/${props.id}`}>{props.name}</Link>
      </h2>
      <h3>{props.description}</h3>
      <h3>{props.city}</h3>
      <h3>{props.price}</h3>
      <h3>{props.eventStartDate}</h3>
      <h3>{props.eventEndDate}</h3>
      <h3>{props.idBusiness}</h3>
    </li>
  );
};

export default Experience;
