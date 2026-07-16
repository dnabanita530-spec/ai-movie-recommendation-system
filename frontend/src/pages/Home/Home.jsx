

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import DashboardLayout from "../../layouts/DashboardLayout";

import { getPoster } from "../../services/tmdbService";
import "./Home.css";


function Home() {

  const [trendingMovies, setTrendingMovies] =
    useState([]);

  const [topRatedMovies, setTopRatedMovies] =
    useState([]);

  useEffect(() => {

    // eslint-disable-next-line react-hooks/immutability
    loadTrendingMovies();
    // eslint-disable-next-line react-hooks/immutability
    loadTopRatedMovies();

  }, []);

  const loadTrendingMovies = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/trending/"
      );

      const data = await response.json();

      setTrendingMovies(data);
      const moviesWithPosters =
await Promise.all(

  data.map(async movie => ({

    ...movie,

    poster: await getPoster(
      movie.title
    )

  }))

);


setTrendingMovies(
  moviesWithPosters
);


    } catch (error) {

      console.error(error);

    }

  };

  
  const loadTopRatedMovies = async () => {

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/top-rated/"
        );

        const data = await response.json();

        const moviesWithPosters = await Promise.all(

            data.map(async (movie) => {

                const cleanTitle = movie.title
                    .replace(/\(\d{4}\)/g, "")
                    .replace(", The", "")
                    .replace(", A", "")
                    .replace(", An", "")
                    .trim();

                return {

                    ...movie,

                    poster:
                        movie.poster ||
                        await getPoster(cleanTitle)

                };

            })

        );

        setTopRatedMovies(moviesWithPosters);

    } catch (error) {

        console.error(error);

    }

};
  return (

    <DashboardLayout>

      <div className="homePage">

        {/* Hero Banner */}

        <div className="heroSection">

          <div className="heroContent">

            <h1>Dune: Part Two</h1>

            <p>
              Paul Atreides unites with Chani and
              the Fremen while seeking revenge
              against the conspirators who
              destroyed his family.
            </p>

           <div className="heroButtons">

  <button className="playBtn">
    ▶ Play Now
  </button>

  <button className="listBtn">
    + My List
  </button>

  <Link
    to="/emotion"
    className="emotionLink"
  >
    <button className="emotionBtn">
      😊 AI Emotion Recommendation
    </button>
  </Link>
  <Link to="/ai-chat">
    <button className="aiChatBtn">
        🤖 AI Movie Assistant
    </button>
</Link>
  

</div>

          </div>

        </div>

        {/* Trending */}

        <section className="movieSection">

          <div className="sectionHeader">

            <h2>Trending Now</h2>

            <span>View All</span>

          </div>

          <div className="movieRow">

          {trendingMovies.slice(0,10).map(movie => (

  
  <div
  key={movie.movieId}
  className="homeMovieCard"
>

  <img
    src={
      movie.poster ||
      "https://dummyimage.com/300x450/111827/ffffff&text=Movie"
    }
    alt={movie.title}
    className="moviePoster"
  />

  <h4>
    {movie.title}
  </h4>

  <p>
    {movie.genres}
  </p>

</div>

))}

          </div>

        </section>

        {/* Recommended */}

        <section className="movieSection">

          <div className="sectionHeader">

            <h2>Recommended For You</h2>

            <span>View All</span>

          </div>

          <div className="movieRow">
console.log(trendingMovies);
          {trendingMovies
  .slice(0, 10)
  .map(movie => (

    <Link
      key={movie.movieId}
      to={`/movies/${movie.movieId}`}
      className="movieLink"
    >

      <MovieCard movie={movie} />

    </Link>

))}

          </div>

        </section>

        {/* Top Rated */}

        <section className="movieSection">

          <div className="sectionHeader">

            <h2>Top Rated</h2>

            <span>View All</span>

          </div>

          <div className="movieRow">

         {topRatedMovies.slice(0,10).map(movie => (

 <Link
  key={movie.movieId}
  to={`/movies/${movie.movieId}`}
  className="movieLink"
>
  <MovieCard movie={movie} />
</Link>

))}

          </div>

        </section>

      </div>

    </DashboardLayout>

  );
}

export default Home;