import avatarPic from "../assets/avatar/avatar2.png";

const ReviewItem = (props) => {
  return (
    // <li key={props.id}>
    //   <h3>{props.idUser}</h3>
    //   <h3>{props.idExperience}</h3>
    //   <h3>{props.comment}</h3>
    // </li>
    <li key={props.id}>
      <div>
        <img source={props.avatar || avatarPic} alt="profile pic" />
      </div>
      <p>comment: {props.comment}</p>
    </li>
  );
};

export default ReviewItem;
