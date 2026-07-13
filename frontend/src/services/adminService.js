export const getAdminStats = async () => {

  const response = await fetch(
    "http://127.0.0.1:8000/admin/stats"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch admin stats");
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