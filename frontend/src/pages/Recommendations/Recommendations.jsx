import { useEffect, useState } from "react";
import {
  getFavorites
} from "../../services/favoriteService";

import {
  getRecommendations
} from "../../services/recommendationService";
import "./Recommendations.css";

function Recommendations() {

  const [recommendations, setRecommendations] =
    useState([]);
    const [currentPage, setCurrentPage] = useState(1);

const moviesPerPage = 8;

 
useEffect(() => {

    // eslint-disable-next-line react-hooks/immutability
    loadRecommendations();

}, []);
const loadRecommendations = async () => {

    const username = localStorage.getItem("username");

    const favorites = await getFavorites(username);

    if (favorites.length === 0) {

        setRecommendations([]);

        return;

    }

    // First favorite movie
    const firstMovie = favorites[0];

    const movies = await getRecommendations(
        firstMovie.movieId
    );

    setRecommendations(movies);

};
const indexOfLastMovie = currentPage * moviesPerPage;

const indexOfFirstMovie =
  indexOfLastMovie - moviesPerPage;

const currentMovies =
  recommendations.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

const totalPages = Math.ceil(
  recommendations.length / moviesPerPage
);
  return (

    <div className="recommendationsPage">

      <h1>
        Recommended For You
      </h1>

      {recommendations.length === 0 ? (

        <div className="emptyRecommendations">

          <h2>
            No Recommendations Yet
          </h2>

          <p>
            Add favorites and rate movies
            to get recommendations.
          </p>

        </div>

      ) : (

        <div className="recommendationsGrid">

         {currentMovies.map(movie => (

            <div
              key={movie.movieId}
              className="recommendationCard"
            >

              <img
                src={
                  movie.poster ||
                  "https://dummyimage.com/300x450/111827/ffffff&text=Movie"
                }
                alt={movie.title}
              />

              <div className="recommendationInfo">

                <h3>
                  {movie.title}
                </h3>

                <p>
                  {movie.genres}
                </p>

                <span>
                  ⭐ {movie.rating || "N/A"}
                </span>

              </div>

            </div>

          ))}

        </div>
        

      )}
<div className="pagination">

  <button
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage(currentPage - 1)
    }
  >
    ◀ Previous
  </button>

  <span>

    Page {currentPage} of {totalPages}

  </span>

  <button
    disabled={currentPage === totalPages}
    onClick={() =>
      setCurrentPage(currentPage + 1)
    }
  >
    Next ▶
  </button>

</div>
    </div>

  );

}

export default Recommendations;