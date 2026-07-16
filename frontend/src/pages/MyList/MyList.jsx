import { useEffect, useState } from "react";

import MovieCard from "../../components/MovieCard/MovieCard";
import {
  getFavorites,
  removeFavorite
} from "../../services/favoriteService";
import "./MyList.css";

function MyList() {

  const [favorites, setFavorites] =
    useState([]);

useEffect(() => {

    // eslint-disable-next-line react-hooks/immutability
    loadFavorites();

}, []);

const loadFavorites = async () => {

    const username = localStorage.getItem("username");

    const data = await getFavorites(username);

    setFavorites(data);

};

const removeMovie = async (id) => {

    const username =
        localStorage.getItem("username");

    await removeFavorite(
        username,
        id
    );

    loadFavorites();

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