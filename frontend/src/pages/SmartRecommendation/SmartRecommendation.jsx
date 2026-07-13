import { useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { getHybridRecommendations } from "../../services/recommendationService";

import { Link } from "react-router-dom";
import "./SmartRecommendation.css";

function SmartRecommendation() {

  const [movieName, setMovieName] =
    useState("");

  const [movies, setMovies] =
    useState([]);
    const [stats, setStats] =
  useState(null);
  const [loading, setLoading] =
  useState(false);
const [tmdbMovie, setTmdbMovie] =
  useState(null);
// const handleRecommend =
//   async () => {

//     if (!movieName) return;

//     try {

//       setLoading(true);

//       const data =
//         await getHybridRecommendations(
//           movieName
//         );

//       setMovies(data);

//       setStats({

//         searchedMovie:
//           movieName,

//         totalRecommendations:
//           data.length,

//         algorithm:
//           "Hybrid Recommendation"

//       });

//     } catch (error) {

//       console.error(error);

//     } finally {

//       setLoading(false);

//     }

//   };
const handleRecommend = async () => {

  if (!movieName) return;

  try {

    setLoading(true);

    const data =
      await getHybridRecommendations(
        movieName
      );

    console.log(data);

    if (data.source === "tmdb") {

      setTmdbMovie(data.movie);

      setMovies([]);

      setStats({
        searchedMovie: movieName,
        totalRecommendations: 1,
        algorithm: "TMDB Search"
      });

    } else {

      setTmdbMovie(null);

      setMovies(data);

      setStats({
        searchedMovie: movieName,
        totalRecommendations:
          data.length,
        algorithm:
          "Hybrid Recommendation"
      });

    }

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }

};

  return (

    <div className="smartPage">

      <h1>
        Hybrid Movie Recommendation
      </h1>

      <div className="searchSection">

        <input
          type="text"
          placeholder="Search Movie..."
          value={movieName}
          onChange={(e) =>
            setMovieName(
              e.target.value
            )
          }
        />

        <button
          onClick={handleRecommend}
        >
          Recommend
        </button>

      </div>
       {stats && (

  <div className="statsBox">

    <h3>
      Recommendation Summary
    </h3>

    <p>
      Search Movie:
      {stats.searchedMovie}
    </p>

    <p>
      Total Recommendations:
      {stats.totalRecommendations}
    </p>

    <p>
      Algorithm:
      {stats.algorithm}
    </p>

  </div>

)}
      {loading && (

  <div className="loadingBox">

    Generating Recommendations...

  </div>

)}
{tmdbMovie && (

  <div className="tmdbCard">

    <img
      src={tmdbMovie.poster}
      alt={movieName}
    />

    <div className="tmdbInfo">

      <h2>{movieName}</h2>

      <p>
        ⭐ {tmdbMovie.rating}
      </p>

      <p>
        Language:
        {" "}
        {tmdbMovie.language}
      </p>

      <p>
        Release:
        {" "}
        {tmdbMovie.release_date}
      </p>

      <p>
        {tmdbMovie.overview}
      </p>

    </div>

  </div>

)}
      <div className="movieGrid">

        {movies.map(movie => (

          <Link
  key={movie.movieId}
  to={`/movies/${movie.movieId}`}
  className="movieLink"
>

  <MovieCard
    movie={movie}
  />

</Link>

        ))}
       

      </div>

    </div>

  );

}

export default SmartRecommendation;