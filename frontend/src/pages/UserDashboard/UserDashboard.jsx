import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { getPoster } from "../../services/tmdbService";
import "./UserDashboard.css";

function UserDashboard() {
const [posters, setPosters] =
  useState({});
  const [favorites, setFavorites] =
    useState([]);

  const [ratings, setRatings] =
    useState([]);

  const [history, setHistory] =
    useState([]);

  useEffect(() => {

    setFavorites(
      JSON.parse(
        localStorage.getItem(
          "favorites"
        )
      ) || []
    );

    setRatings(
      JSON.parse(
        localStorage.getItem(
          "userRatings"
        )
      ) || []
    );

    setHistory(
      JSON.parse(
        localStorage.getItem(
          "watchHistory"
        )
      ) || []
    );

  }, []);

  const likedMovies =
    ratings.filter(
      item => item.rating >= 4
    );
useEffect(() => {

  const loadPosters = async () => {

    const posterMap = {};

    const allMovies = [
      ...history,
      ...favorites
    ];

    for (const movie of allMovies) {

      if (!posterMap[movie.movieId]) {

        const poster =
          await getPoster(movie.title);

        posterMap[movie.movieId] =
          poster;

      }

    }

    setPosters(posterMap);

  };

  if (
    history.length > 0 ||
    favorites.length > 0
  ) {

    loadPosters();

  }

}, [history, favorites]);
  return (

    <div className="dashboardContainer">

      {/* Sidebar */}

      <div className="dashboardSidebar">

        <h2>Dashboard</h2>

        <ul>
<li>
  <Link to="/profile">
    👤 Profile
  </Link>
</li>

{/* <li>
  <Link to="/watch-history">
    🕒 Watch History
  </Link>
</li> */}
    <li>
    <Link to="/history">🕒 User History</Link>
    </li>

<li>
  <Link to="/my-list">
    ❤️ Liked Movies
  </Link>
</li>

{/* <li>
  <Link to="/liked-movies">
    👍 Liked Movies
  </Link>
</li> */}

<li>
  <Link to="/reviews">
    ⭐ Reviews
  </Link>
</li>

<li>
  <Link to="/notifications">
    🔔 Notifications
  </Link>
</li>

<li>
  <Link to="/settings">
    ⚙ Settings
  </Link>
</li>

<li>
  <Link to="/login">
    🚪 Logout
  </Link>
</li>

        </ul>

      </div>

      {/* Content */}

      <div className="dashboardContent">

        <div className="welcomeSection">

          <h1>
            Welcome Back!
          </h1>

          <p>
            Your Movie Dashboard
          </p>

        </div>

        {/* Stats */}

        <div className="statsGrid">

          <div className="statCard">

            <h3>
              {history.length}
            </h3>

            <p>
              Watch History
            </p>

          </div>

          <div className="statCard">

            <h3>
              {favorites.length}
            </h3>

            <p>
              My List
            </p>

          </div>

          <div className="statCard">

            <h3>
              {likedMovies.length}
            </h3>

            <p>
              Liked Movies
            </p>

          </div>

          <div className="statCard">

            <h3>
              {ratings.length}
            </h3>

            <p>
              Reviews
            </p>

          </div>

        </div>

        {/* Continue Watching */}

        <div className="section">

          <h2>
            Continue Watching
          </h2>

          <div className="movieGrid">

            {history.slice(0,4).map(movie => (

             <Link
  key={movie.movieId}
  to={`/movies/${movie.movieId}`}
  className="movieLink"
>
  <div className="movieCard">

                <img
  src={
    posters[movie.movieId] ||
    "https://dummyimage.com/300x450/111827/ffffff&text=Movie"
  }
  alt={movie.title}
/>

                <h4>
                  {movie.title}
                </h4>

                <div className="progressBar">

                  <div
                    className="progressFill"
                    style={{
                      width:
                      `${movie.progress || 70}%`
                    }}
                  />

                </div>

                <span>
                  {movie.progress || 70}%
                </span>

              </div>
</Link>
        
            ))}
      
        </div>
            </div>
  


        {/* Recommendations */}

        <div className="section">

          <h2>
            Recommendations For You
          </h2>

          <div className="movieGrid">

            {favorites.slice(0,6).map(movie => (

           <Link
  key={movie.movieId}
  to={`/movies/${movie.movieId}`}
  className="movieLink"
>
  <div className="movieCard">

               <img
  src={
    posters[movie.movieId] ||
    "https://dummyimage.com/300x450/111827/ffffff&text=Movie"
  }
  alt={movie.title}
/>

                <h4>
                  {movie.title}
                </h4>

              </div>
              
</Link>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}

export default UserDashboard;