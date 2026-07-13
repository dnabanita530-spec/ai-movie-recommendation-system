export const getRecommendations = async (movieId) => {

  const response = await fetch(
    `http://127.0.0.1:8000/recommendations/${movieId}`
  );

  return await response.json();

};

export const getHybridRecommendations = async (movieName) => {

  const username = localStorage.getItem("username");

  const response = await fetch(

    `http://127.0.0.1:8000/hybrid/search/${encodeURIComponent(movieName)}?username=${encodeURIComponent(username)}`

  );

  return await response.json();

};