import { useEffect, useState } from "react";
import "./Reviews.css";

function Reviews() {

  const [reviews, setReviews] =
    useState([]);

  useEffect(() => {

    const savedReviews =
      JSON.parse(
        localStorage.getItem(
          "userRatings"
        )
      ) || [];

    setReviews(savedReviews);

  }, []);

  const deleteReview = (
    movieId
  ) => {

    const updatedReviews =
      reviews.filter(
        review =>
          review.movieId !== movieId
      );

    setReviews(
      updatedReviews
    );

    localStorage.setItem(
      "userRatings",
      JSON.stringify(
        updatedReviews
      )
    );

  };

  return (

    <div className="reviewsPage">

      <h1>
        ⭐ My Reviews
      </h1>

      {reviews.length === 0 ? (

        <div className="emptyReviews">

          No Reviews Found

        </div>

      ) : (

        <div className="reviewsGrid">

          {reviews.map(review => (

            <div
              key={review.movieId}
              className="reviewCard"
            >

              <h3>
                {review.title}
              </h3>

              <p>
                {review.genres}
              </p>

              <div className="ratingBadge">

                ⭐ {review.rating}/5

              </div>

              <button
                onClick={() =>
                  deleteReview(
                    review.movieId
                  )
                }
              >

                Delete Review

              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Reviews;