import { useEffect, useState } from "react";

import "./Recommendations.css";

function Recommendations() {

  const [recommendations, setRecommendations] =
    useState([]);

  useEffect(() => {

    generateRecommendations();

  }, []);

  const generateRecommendations = () => {

    const ratings =
      JSON.parse(
        localStorage.getItem("userRatings")
      ) || [];

    const favorites =
      JSON.parse(
        localStorage.getItem("favorites")
      ) || [];

    const likedMovies = [

      ...ratings.filter(
        r => r.rating >= 4
      ),

      ...favorites

    ];

    setRecommendations(likedMovies);

  };

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

          {recommendations.map(movie => (

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

    </div>

  );

}

export default Recommendations;