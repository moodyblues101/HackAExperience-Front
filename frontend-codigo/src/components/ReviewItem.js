const ReviewItem = (props) => {
  return (
    <li key={props.id}>
      <h3>{props.idUser}</h3>
      <h3>{props.idExperience}</h3>
      <h3>{props.comment}</h3>
    </li>
  );
};

export default ReviewItem;
