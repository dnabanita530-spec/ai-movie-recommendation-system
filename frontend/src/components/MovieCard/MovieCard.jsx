


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
{/* ⭐ {movie.rating ?? "N/A"} */}
        </div>

      
        <p className="movieGenres">

    {movie.genres
        ? movie.genres.replace(/\|/g, " • ")
        : "Genres not available"}

</p>

      </div>

    </div>

  );

}

export default MovieCard;