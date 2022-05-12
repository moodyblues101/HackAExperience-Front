const ReviewItem = (props) => {
  return (
    // <li key={props.id}>
    //   <h3>{props.idUser}</h3>
    //   <h3>{props.idExperience}</h3>
    //   <h3>{props.comment}</h3>
    // </li>
    <li key={props.id}>
      <div>
        <img
          src={`http://localhost:3000/avatars/${props.avatar}`}
          alt="profile pic"
        />
      </div>
      <p>comment: {props.comment}</p>
    </li>
  );
};

export default ReviewItem;
