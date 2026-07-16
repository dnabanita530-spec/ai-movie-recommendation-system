
export const getAdminStats = async () => {

    const response = await fetch(
        "http://127.0.0.1:8000/admin/analytics"
    );

    if (!response.ok) {
        throw new Error("Failed");
    }

    return await response.json();
};
export const addMovieApi = async (movie) => {

  const response = await fetch(
    "http://127.0.0.1:8000/admin/movies",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(movie)
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add movie");
  }

  return await response.json();

};

export const getAdminMovies = async (

    page = 1,

    search = ""

) => {

    const response = await fetch(

        `http://127.0.0.1:8000/admin/movies/?page=${page}&limit=50&search=${search}`

    );

    return await response.json();

};

export const updateMovie = async (movieId, movieData) => {

    const response = await fetch(

        `http://127.0.0.1:8000/admin/movies/${movieId}`,

        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(movieData)

        }

    );

    return await response.json();

};

export const deleteMovie = async (movieId) => {

    const response = await fetch(

        `http://127.0.0.1:8000/admin/movies/${movieId}`,

        {

            method: "DELETE"

        }

    );

    return await response.json();

};