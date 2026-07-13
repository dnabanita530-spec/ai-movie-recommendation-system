export const getMovieById = async (id) => {

  const response = await fetch(
    `http://127.0.0.1:8000/movies/${id}`
  );

  return await response.json();

};