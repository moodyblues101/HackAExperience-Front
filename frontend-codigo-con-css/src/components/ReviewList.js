import ReviewsItem from "./ReviewItem";

import "./ReviewList.css";

const ReviewList = (props) => {
  return (
    <div className="review-list-container">
      <ul>
        {props.reviews.map((review) => (
          <ReviewsItem
            key={review.id}
            id={review.id}
            idUser={review.idUser}
            idExperience={review.idExperience}
            comment={review.comment}
            rating={review.rating}
            avatar={review.profilePic}
            userName={review.userName}
          />
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
