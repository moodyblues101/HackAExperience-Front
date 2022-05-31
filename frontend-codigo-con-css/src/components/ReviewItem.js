import ReactStars from "react-rating-stars-component";

import "./ReviewItem.css";

const ReviewItem = (props) => {
  return (
    <li className="review-list-container-li" key={props.id}>
      <div>
        <img
          src={`http://localhost:3000/avatars/${props.avatar}`}
          alt="profile pic"
        />
      </div>
      <div className="review-comment-container">{props.comment}</div>
      <div>
        {props.rating !== null && (
          <ReactStars
            value={props.rating}
            count={5}
            size={24}
            activeColor="#ffd700"
            edit={false}
          />
        )}
      </div>
    </li>
  );
};

export default ReviewItem;
