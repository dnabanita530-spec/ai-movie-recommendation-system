import axios from "axios";

const API =
  "http://127.0.0.1:8000";

export const updateMovie =
  (movieId, movieData) => {

    return axios.put(
      `${API}/movies/${movieId}`,
      movieData
    );

  };

  export const deleteMovieApi =
  (movieId) => {

    return axios.delete(
      `${API}/movies/${movieId}`
    );

  };

export const addMovieApi =
  (movieData) => {

    return axios.post(
      `${API}/movies`,
      movieData
    );

  };