import ReviewsItem from "./ReviewItem";

const ReviewList = (props) => {
  return (
    <ul>
      {props.reviews.map((review) => (
        <ReviewsItem
          key={review.id}
          idUser={review.idUser}
          idExperience={review.idExperience}
          comment={review.comment}
        />
      ))}
    </ul>
  );
};

export default ReviewList;
