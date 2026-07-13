// import axios from "axios";

// const API = "http://127.0.0.1:8000";

// export const getMovieDetails = async (id) => {
//   const res = await axios.get(
//     `${API}/tmdb/${id}`
//   );

//   return res.data;
// };



import axios from "axios";

const API_KEY =
  "a2e02779d65925a649c2e422a44819b6";

export const getPoster =
  async (title) => {

    try {

      // const cleanTitle = title

      //   // Remove year
      //   .replace(/\(\d{4}\)/g, "")

      //   // Matrix, The -> The Matrix
      //   .replace(/^(.*), The$/, "The $1")

      //   // Bug's Life, A -> A Bug's Life
      //   .replace(/^(.*), A$/, "A $1")

      //   .trim();

      // console.log(
      //   "Searching TMDB:",
      //   cleanTitle
      // );

      // const res =
      //   await axios.get(
      //     "https://api.themoviedb.org/3/search/movie",
      //     {
      //       params: {
      //         api_key: API_KEY,
      //         query: cleanTitle
      //       }
      //     }
      //   );
      const match =
  title.match(/\((\d{4})\)/);

const year =
  match ? match[1] : "";

const cleanTitle =
  title.replace(/\(\d{4}\)/g, "")
       .trim();

const res =
  await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        api_key: API_KEY,
        query: cleanTitle,
        year: year
      }
    }
  );

      if (
        res.data.results &&
        res.data.results.length > 0
      ) {

        const movie =
          res.data.results.find(
            m => m.poster_path
          );

        if (
          movie &&
          movie.poster_path
        ) {

          return (
            "https://image.tmdb.org/t/p/w500" +
            movie.poster_path
          );

        }

      }

      return null;

    } catch (error) {

      console.error(
        "TMDB Error:",
        title,
        error
      );

      return null;

    }

};