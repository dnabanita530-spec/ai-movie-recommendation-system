import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../../services/movieService";
import "./Genres.css";

function Genres() {

  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    // eslint-disable-next-line react-hooks/immutability
    loadGenres();

  }, []);

  const loadGenres = async () => {

    const movies = await getMovies();

    const genreCount = {};

    movies.forEach(movie => {

      if (!movie.genres) return;

      movie.genres.split("|").forEach(g => {

        genreCount[g] = (genreCount[g] || 0) + 1;

      });

    });

    const result = Object.keys(genreCount)
      .map(name => ({
        name,
        count: genreCount[name]
      }))
      .sort((a, b) => b.count - a.count);

    setGenres(result);

  };

  return (

    <div className="genresPage">

      <h1>🎭 Browse by Genre</h1>

      <p>
        Discover movies by your favorite category.
      </p>

      <div className="genreGrid">

        {genres.map((genre) => (

          <div
            key={genre.name}
            className="genreCard"
            onClick={() =>
            navigate(`/browse?genre=${genre.name}`)
            }
          >

            <h2>{genre.name}</h2>

            <span>
              {genre.count} Movies
            </span>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Genres;