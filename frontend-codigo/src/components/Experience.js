import { Link } from "react-router-dom";

import formatDate from "../util/formatDate";

const Experience = (props) => {
  const startDate = formatDate(props.eventStartDate);
  const endDate = formatDate(props.eventEndDate);
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
      <h3>{props.description}</h3>
      <h3>{props.city}</h3>
      <h3>{props.price}</h3>

      {startDate.day === endDate.day ? (
        <h3>
          Empieza el {startDate.day} de {startDate.month} del {startDate.year} a
          las {startDate.time}h. Termina a las {endDate.time}h
        </h3>
      ) : (
        <h3>
          Empieza el {startDate.day} de {startDate.month} del {startDate.year} a
          las {startDate.time}h. Termina el día {endDate.day} a las{" "}
          {endDate.time}h
        </h3>
      )}
      <h3>{props.businessName}</h3>
    </li>
  );
};

export default Experience;
