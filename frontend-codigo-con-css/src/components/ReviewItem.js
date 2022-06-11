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
      <div className="review-list-container-li-div">
        <div className="review-list-name-rating-container">
          <div className="light-text">{props.userName}</div>
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
        </div>
        <div className="review-comment-container">{props.comment}</div>
      </div>
    </li>
  );
};

export default ReviewItem;
