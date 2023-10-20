const Reviews = ({ reviews }) => {
  return (
    <div>
      <h3>Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>{review.comment}</p>
          <p>{review.rating} stars</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
