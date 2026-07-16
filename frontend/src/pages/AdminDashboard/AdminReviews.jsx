import {
  useEffect,
  useState
} from "react";

import {
  deleteReview,
  getReviews
} from "../../services/adminReviewService";

import "./AdminReviews.css";

function AdminReviews() {

  const [reviews,
    setReviews] =
      useState([]);

  useEffect(() => {

    // eslint-disable-next-line react-hooks/immutability
    loadReviews();

  }, []);

  const loadReviews =
    async () => {

      try {

        const data =
          await getReviews();

        console.log(data);

        setReviews(data);

      } catch (error) {

        console.error(error);

      }

    };

  return (

    <div className="adminReviewsPage">

      <h1>
        ⭐ Review Management
      </h1>

      <table className="reviewsTable">

        <thead>

          <tr>

            <th>User</th>

            <th>Movie</th>

            <th>Rating</th>

            <th>Review</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {reviews.length > 0 ? (

            reviews.map(
              (
                review,
                index
              ) => (

                <tr key={index}>

                  <td>
                    {review.user}
                  </td>

                  <td>
                    {review.movie}
                  </td>

                  <td>

                    <span
                      className="ratingBadge"
                    >

                      ⭐ {review.rating}/5

                    </span>

                  </td>

                  <td>

                    <div
                      className="reviewText"
                    >

                      {review.review}

                    </div>

                  </td>

                  <td>

                    <button
                      className="deleteBtn"
                      onClick={
                        async () => {

                          await deleteReview(
                            index
                          );

                          loadReviews();

                        }
                      }
                    >

                      🗑️

                    </button>

                  </td>

                </tr>

              )
            )

          ) : (

            <tr>

              <td
                colSpan="5"
                className="emptyReviews"
              >

                No Reviews Found

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

}

export default AdminReviews;