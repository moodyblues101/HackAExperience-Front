import "./Review.css";

const Review = (props) => {
  return (
    <li>
      <h2>id de review: {props.id}</h2>
      <h3>id de usuario: {props.idUser}</h3>
      <h3>comentario: {props.comment}</h3>
      <h3> rating: {props.rating}</h3>
      <h3>fecha de creacion: {props.createdAt}</h3>
    </li>
  );
};

export default Review;
