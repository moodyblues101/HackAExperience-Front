import { Link } from "react-router-dom";

import formatDate from "../util/formatDate";

import "./Experience.css";

const Experience = (props) => {
  const startDate =
    formatDate(props.eventStartDate).day +
    "/" +
    formatDate(props.eventStartDate).month +
    "/" +
    formatDate(props.eventStartDate).year;
  return (
    <li className="experience-list-container-li">
      <Link to={`/experiences/${props.id}`}>
        <div className="experience-list-img-container">
          <img
            src={`http://localhost:3000/experiences/${props.id}/${props.imgExp}`}
            alt="experience"
          />
        </div>
        <div className="exp-list-name">{props.name}</div>
        <div className="light-text">{props.city}</div>
        <div>{props.price}€</div>
        <div className="light-text">{startDate}</div>
      </Link>
    </li>
  );
};

export default Experience;
