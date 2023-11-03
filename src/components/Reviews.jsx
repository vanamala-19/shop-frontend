import React, { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";

const Reviews = ({ reviews, onAddReview }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReview({ comment, rating });
    setComment("");
    setRating(1);
  };

  const handleShowMore = () => {
    setShowAll(!showAll);
  };

  const visibleReviews = showAll ? reviews : reviews.slice(0, 2);

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Reviews</h3>
      <div className="space-y-4">
        {visibleReviews.map((review) => (
          <div key={review.id} className="bg-gray-100 p-4 rounded-md">
            <p>Username: {review.username}</p>
            <p className="text-gray-700">{review.comment}</p>
            <p className="text-gray-500">{review.rating} stars</p>
            <p>Created At: {new Date(review.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      {!showAll && reviews.length > 2 && (
        <button
          onClick={handleShowMore}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className={`btn-${theme} mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2`}>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Add Review
        </button>
      </form>
    </div>
  );
};

export default Reviews;
