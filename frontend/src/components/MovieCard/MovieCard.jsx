// function MovieCard({ movie }) {

//   return (

//     <div className="movieCard">

//       <img
//         src="https://via.placeholder.com/300x450?text=Movie"
//         alt={movie.title}
//       />

//       <h4>{movie.title}</h4>

//       <p>{movie.genres}</p>

//     </div>

//   );
// }

// export default MovieCard;
// function MovieCard({ movie }) {

//   return (

//     <div className="movieCard">

//       <img
//         src={
//           movie.poster ||
//           "https://dummyimage.com/300x450/111827/ffffff&text=Movie"
//         }
//         alt={movie.title}
//       />

//       <h4>{movie.title}</h4>

//       <p>{movie.genres}</p>

//     </div>

//   );
// }

// export default MovieCard;


// import { useEffect, useState } from "react";
// import { getPoster } from "../../services/tmdbService";

// function MovieCard({ movie }) {

//   const [poster, setPoster] =
//     useState(null);

//   useEffect(() => {

//     const loadPoster = async () => {

//       console.log(
//         "Searching:",
//         movie.title
//       );

//       const image =
//         await getPoster(
//           movie.title
//         );

//       console.log(
//         "Result:",
//         movie.title,
//         image
//       );

//       setPoster(image);

//     };

//     loadPoster();

//   }, [movie.title]);

//   return (

//     <div className="movieCard">

//       <img
//         src={
//           poster ||
//           "https://via.placeholder.com/300x450?text=Movie"
//         }
//         alt={movie.title}
//       />

//       <h4>{movie.title}</h4>

//       <p>{movie.genres}</p>

//     </div>

//   );

// }

// export default MovieCard;


function MovieCard({ movie }) {

  return (

    <div className="movieCard">

      <img
        src={
          movie.poster ||
          "https://dummyimage.com/300x450/111827/ffffff&text=Movie"
        }
        alt={movie.title}
      />

      <div className="movieInfo">

        <h4>{movie.title}</h4>

        <div className="movieRating">

          ⭐ {movie.rating ? movie.rating.toFixed(1) : "N/A"}

        </div>

        <p className="movieGenres">

          {movie.genres.replace(/\|/g, " • ")}

        </p>

      </div>

    </div>

  );

}

export default MovieCard;