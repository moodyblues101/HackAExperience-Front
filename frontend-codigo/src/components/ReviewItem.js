const ReviewItem = (props) => {
  return (
    // <li key={props.id}>
    //   <h3>{props.idUser}</h3>
    //   <h3>{props.idExperience}</h3>
    //   <h3>{props.comment}</h3>
    // </li>
    <li key={props.id}>
      <input type="checkbox" id={props.id} name={props.id} />
      <label>Id: {props.id}</label>
      <p>idUser: {props.idUser}</p>
      <p>idExperience: {props.idExperience}</p>
      <p>comment: {props.comment}</p>
    </li>
  );
};

export default ReviewItem;
