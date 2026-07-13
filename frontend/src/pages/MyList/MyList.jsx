import { useEffect, useState } from "react";

import MovieCard from "../../components/MovieCard/MovieCard";

import "./MyList.css";

function MyList() {

  const [favorites, setFavorites] =
    useState([]);

  useEffect(() => {

    const data =
      JSON.parse(
        localStorage.getItem(
          "favorites"
        )
      ) || [];

    setFavorites(data);

  }, []);
  const removeMovie = (id) => {

  const updated =
    favorites.filter(
      movie =>
        movie.movieId !== id
    );

  localStorage.setItem(
    "favorites",
    JSON.stringify(updated)
  );

  setFavorites(updated);

};

  return (

    <div className="myListPage">

      <h1>
        ❤️ My Favorite Movies
      </h1>

      <div className="favoritesGrid">

       {favorites.map(movie => (

  <div
    key={movie.movieId}
    className="favoriteCard"
  >

    <MovieCard
      movie={movie}
    />

    <button
      className="removeBtn"
      onClick={() =>
        removeMovie(movie.movieId)
      }
    >
      Remove
    </button>

  </div>

))}

      </div>
      
      

    </div>

  );

}

export default MyList;