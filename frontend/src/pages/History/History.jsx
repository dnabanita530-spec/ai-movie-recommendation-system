import { useEffect, useState } from "react";

import MovieCard from "../../components/MovieCard/MovieCard";

import "./History.css";

function History() {

  const [history,
    setHistory] =
      useState([]);

  useEffect(() => {

    const movies =
      JSON.parse(
        localStorage.getItem(
          "watchHistory"
        )
      ) || [];

    setHistory(movies);

  }, []);

  return (

    <div className="historyPage">

      <h1>
        Recently Viewed Movies
      </h1>

      <div className="historyGrid">

        {history.map(movie => (

          <MovieCard
            key={movie.movieId}
            movie={movie}
          />

        ))}

      </div>

    </div>

  );

}

export default History;