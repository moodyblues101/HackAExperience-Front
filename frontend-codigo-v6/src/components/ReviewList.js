import Review from "./Review";

const ReviewList = (props) => {
  return (
    <ul>
      {props.reviews.map((review) => (
        <Review
          key={review.id}
          id={review.id}
          idUser={review.idUser}
          comment={review.comment}
          rating={review.rating}
          createdAt={review.createdAt}
        />
      ))}
    </ul>
  );
};

export default ReviewList;
