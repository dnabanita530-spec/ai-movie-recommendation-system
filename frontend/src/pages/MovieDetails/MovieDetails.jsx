


import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import {
  addFavorite,
  getFavorites,
  removeFavorite
} from "../../services/favoriteService";
import {
  addHistory
} from "../../services/historyService";
import { getMovieById } from "../../services/movieService";
import {
  addRating
} from "../../services/ratingService";
import { getRecommendations } from "../../services/recommendationService";
import {
  addReview
} from "../../services/reviewService";
import "./MovieDetails.css";

function MovieDetails() {

  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const [recommendations, setRecommendations] = useState([]);

  const [userRating, setUserRating] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [watching, setWatching] = useState(false);
  const [ratingSaved,setRatingSaved]=useState(false);
const [review, setReview] = useState("");
  useEffect(() => {
    loadMovie();
  }, [id]);

// const loadMovie = async () => {

//   const data = await getMovieById(id);

//   setMovie(data);

//   // -------------------------
//   // Favorite Status
//   // -------------------------

//   // const favorites =
//   //   JSON.parse(localStorage.getItem("favorites")) || [];

//   // setIsFavorite(
//   //   favorites.some(item => item.movieId === data.movieId)
//   // );
// const username = localStorage.getItem("username");

// const favorites = await getFavorites(username);

// setIsFavorite(

//     favorites.some(

//         item => item.movieId === data.movieId

//     )

// );
//   // -------------------------
//   // Previously Saved Rating
//   // -------------------------

//   // const ratings =
//   //   JSON.parse(localStorage.getItem("ratings")) || [];

//   // const saved = ratings.find(
//   //   r => r.movieId === data.movieId
//   // );

//   // if (saved) {

//   //   setUserRating(saved.rating);

//   //   setRatingSaved(true);

//   // } else {

//   //   setUserRating("");

//   //   setRatingSaved(false);

//   // }

//   // -------------------------
//   // Similar Movies
//   // -------------------------

//   const recs = await getRecommendations(id);

//   setRecommendations(recs);

// };

const loadMovie = async () => {

  try {

    const data = await getMovieById(id);

    setMovie(data);

    const username = localStorage.getItem("username");

    // Save watch history
    await addHistory({

      username,

      movieId: data.movieId,

      title: data.title,

      poster: data.poster

    });

    // Check favorite status
    const favorites = await getFavorites(username);

    setIsFavorite(

      favorites.some(
        item => item.movieId === data.movieId
      )

    );

    // Load recommendations
    const recs = await getRecommendations(id);

    setRecommendations(recs);

  }

  catch (err) {

    console.error(err);

  }

};

// const addToFavorites = () => {

//   const favorites =
//     JSON.parse(localStorage.getItem("favorites")) || [];

//   if (isFavorite) {

//     const updated = favorites.filter(
//       item => item.movieId !== movie.movieId
//     );

//     localStorage.setItem(
//       "favorites",
//       JSON.stringify(updated)
//     );

//     setIsFavorite(false);

//     alert("Removed from Favorites");

//   } else {

//     favorites.push(movie);

//     localStorage.setItem(
//       "favorites",
//       JSON.stringify(favorites)
//     );

//     setIsFavorite(true);

//     alert("Added to Favorites ❤️");

//   }

// };
const addToFavorites = async () => {

    const username =
        localStorage.getItem("username");

    try{

        if(isFavorite){

            await removeFavorite(
                username,
                movie.movieId
            );

            setIsFavorite(false);

            alert("Removed from Favorites");

        }

        else{

            await addFavorite({

                username,

                movieId: movie.movieId,

                title: movie.title,

                poster: movie.poster

            });

            setIsFavorite(true);

            alert("Added to Favorites ❤️");

        }

    }

    catch(error){

        console.error(error);

        alert("Something went wrong.");

    }

};

// const saveRating=()=>{

// if(!userRating){

// alert("Please select a rating");

// return;

// }

// const ratings=
// JSON.parse(localStorage.getItem("ratings"))||[];

// const existing=
// ratings.find(r=>r.movieId===movie.movieId);

// if(existing){

// existing.rating=Number(userRating);

// }else{

// ratings.push({

// movieId:movie.movieId,

// title:movie.title,

// rating:Number(userRating)

// });

// }

// localStorage.setItem(

// "ratings",

// JSON.stringify(ratings)

// );

// setRatingSaved(true);

// };
const saveRating = async () => {

    if (!userRating) {

        alert("Please select a rating");

        return;

    }

    await addRating({

        username:
            localStorage.getItem("username"),

        movieId:
            movie.movieId,

        title:
            movie.title,

        rating:
            Number(userRating)

    });

    setRatingSaved(true);

    alert("Rating Saved");

};
const saveReview = async () => {

    if(!review){

        alert("Write a review");

        return;

    }

    await addReview({

        username:
            localStorage.getItem("username"),

        movieId:
            movie.movieId,

        title:
            movie.title,

        review

    });

    alert("Review Saved");

};
 const watchTrailer = async () => {

  setWatching(true);

  const response = await fetch(
    `http://127.0.0.1:8000/movies/${id}/trailer`
  );

  const data = await response.json();

  if (data.trailer) {

    window.open(data.trailer, "_blank");

  }

  setTimeout(() => {

    setWatching(false);

  },3000);

};

  if (!movie) {

    return <h2>Loading...</h2>;

  }

  return (

  <div className="movieDetails">

   <div className="movieHero">

  <div className="leftSide">

    <img
      className="moviePoster"
      src={
        movie.poster ||
        "https://dummyimage.com/400x600/222/ffffff&text=Movie"
      }
      alt={movie.title}
    />

  </div>

  <div className="rightSide">

    <h1>{movie.title}</h1>

    <div className="movieMeta">

      <span>
        ⭐ {movie.rating || "N/A"}
      </span>

      <span>
        📅 {movie.release_date?.split("-")[0]}
      </span>

      <span>
        ⏱ {movie.runtime || "N/A"} min
      </span>

    </div>
   

    <div className="genres">

      {movie.genres?.split("|").map((genre)=>(

        <span
          key={genre}
          className="genreBadge"
        >
          {genre}
        </span>

      ))}

    </div>

    <button
className={
watching
? "trailerBtn trailerActive"
: "trailerBtn"
}
onClick={watchTrailer}
>

{watching
? "🎬 Watching Trailer"
: "▶ Watch Trailer"}

</button>

  </div>

</div>

<div className="overviewSection">

<h2>

Overview

</h2>

<p>

{movie.overview}

</p>

</div>

<div className="castSection">

<h2>

Cast

</h2>

<div className="castGrid">

{movie.cast?.map(actor=>(

<div
className="castCard"
key={actor.name}
>

<img

src={
actor.profile ||
"https://dummyimage.com/100x100"

}

alt={actor.name}

/>

<h4>

{actor.name}

</h4>

<p>

{actor.character}

</p>

</div>

))}

</div>

</div>

<div className="crewSection">

<h2>

Crew

</h2>

<div className="crewGrid">

{movie.crew?.map(person=>(

<div
className="crewCard"
key={person.name}
>

<h4>

{person.name}

</h4>

<p>

{person.job}

</p>

</div>

))}

</div>
</div>


<div className="ottSection">

<h2>

Available On

</h2>

<div className="ottPlatforms">

{movie.providers?.length>0 ?

movie.providers.map(provider=>(

<a

key={provider.name}

href={`https://www.google.com/search?q=${encodeURIComponent(provider.name)}`}

target="_blank"

rel="noreferrer"

className="ottCard"

>

<img

src={provider.logo}

alt={provider.name}

/>

<p>

{provider.name}

</p>

</a>

))

:

<p>

Not Available</p>

}

</div>

</div>

<div className="actionRow">

  <button
    className={
      isFavorite
        ? "favBtn activeFav"
        : "favBtn"
    }
    onClick={addToFavorites}
  >

    {isFavorite
      ? "❤️ Added To Favorites"
      : "🤍 Add To Favorites"}

  </button>

  <div className="ratingRow">

    <select
      value={userRating}
      onChange={(e)=>setUserRating(e.target.value)}
    >

      <option value="">Rate Movie</option>

      <option value="1">1 ⭐</option>
      <option value="2">2 ⭐</option>
      <option value="3">3 ⭐</option>
      <option value="4">4 ⭐</option>
      <option value="5">5 ⭐</option>

    </select>

    <button
className={
ratingSaved
? "saveBtn saved"
: "saveBtn"
}
onClick={saveRating}
>

{ratingSaved

? `⭐ Rated ${userRating}/5`

: "Save Rating"}

</button>

  </div>
   <div className="reviewSection">

    <h3>✍️ Write Your Review</h3>

    <textarea
        className="reviewInput"
        value={review}
        onChange={(e)=>setReview(e.target.value)}
        placeholder="Share your thoughts about this movie..."
    />

    <button
        className="reviewButton"
        onClick={saveReview}
    >
        📝 Submit Review
    </button>

</div>

</div>



    <h2 className="similarTitle">

      Similar Movies

    </h2>

    <div className="recommendationGrid">

      {recommendations
        .slice(0, 10)
        .map((movie) => (

          <Link
            key={movie.movieId}
            to={`/movies/${movie.movieId}`}
            className="movieLink"
          >

            <MovieCard movie={movie} />

          </Link>

      ))}

    </div>

  </div>

);

}

export default MovieDetails;