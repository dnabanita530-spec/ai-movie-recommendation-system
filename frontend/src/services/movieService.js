export const getMovies = async () => {

  const response = await fetch(
    "http://127.0.0.1:8000/movies/"
  );

  return await response.json();

};

export const getMovieById = async (id) => {

  const response = await fetch(
    `http://127.0.0.1:8000/movies/${id}`
  );

  return await response.json();

};

export const getTrailer = async (
  movieId
) => {

  const response =
    await fetch(

      `http://127.0.0.1:8000/movies/${movieId}/trailer`

    );

  return await response.json();

};