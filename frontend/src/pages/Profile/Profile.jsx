import { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {

  const [profile, setProfile] = useState(null);

  const [favorites, setFavorites] = useState([]);

  const [history, setHistory] = useState([]);

  const [ratings, setRatings] = useState([]);

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    try {

      const username =
        localStorage.getItem("username");

      if (!username) {

        console.log(
          "No username found in localStorage"
        );

        return;

      }

      console.log(
        "Username:",
        username
      );

      const response = await fetch(
  `http://localhost:8000/profile/${encodeURIComponent(username)}`
);

      const data =
        await response.json();

      console.log(
        "Profile Data:",
        data
      );

      setProfile(data);

      setFavorites(
        JSON.parse(
          localStorage.getItem(
            "favorites"
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

      setRatings(
        JSON.parse(
          localStorage.getItem(
            "userRatings"
          )
        ) || []
      );

    } catch (error) {

      console.error(
        "Profile Load Error:",
        error
      );

    }

  };

  if (!profile) {

    return (

      <div className="profilePage">

        <h1>
          Loading...
        </h1>

      </div>

    );

  }

  return (

    <div className="profilePage">

      {/* Hero Section */}

      <div className="profileHero">

        <div className="avatar">

          {profile.username
            ? profile.username
                .charAt(0)
                .toUpperCase()
            : "U"}

        </div>

        <div>

          <h1>

            Welcome,
            {" "}
            {profile.username}
            👋

          </h1>

          <p>

            {profile.email}

          </p>

          <span>

            Movie Explorer 🎬

          </span>

        </div>

      </div>

      {/* Stats */}

      <div className="statsGrid">

        <div className="statCard">

          <h2>

            {history.length}

          </h2>

          <p>

            Movies Watched

          </p>

        </div>

        <div className="statCard">

          <h2>

            {favorites.length}

          </h2>

          <p>

            Favorites

          </p>

        </div>

        <div className="statCard">

          <h2>

            {ratings.length}

          </h2>

          <p>

            Reviews

          </p>

        </div>

        <div className="statCard">

          <h2>

            {profile.recommendations || 0}

          </h2>

          <p>

            Recommendations

          </p>

        </div>

      </div>

      {/* Insights */}

      <div className="insights">

        <div className="insightCard">

          <h3>

            Recommendation Insights

          </h3>

          <p>

            Total Generated:
            {" "}
            {profile.recommendations || 0}

          </p>

          <p>

            Last Search:

          </p>

          <p className="searchMovie">

            {profile.lastSearch ||
              "No Searches Yet"}

          </p>

        </div>

        <div className="insightCard">

          <h3>

            Movie Personality

          </h3>

          <p>

            🎬 Cinephile

          </p>

          <p>

            Loves Movies &
            Recommendations

          </p>

        </div>

      </div>

      {/* Recently Watched */}

      <h2 className="sectionTitle">

        Recently Watched

      </h2>

      <div className="movieGrid">

        {history
          .slice(0, 6)
          .map(movie => (

            <div
              key={movie.movieId}
              className="movieCard"
            >

              <img
                src={
                  movie.poster ||
                  "https://dummyimage.com/300x450/111827/ffffff&text=Movie"
                }
                alt={movie.title}
              />

              <h4>

                {movie.title}

              </h4>

            </div>

          ))}

      </div>

      {/* Recent Ratings */}

      <h2 className="sectionTitle">

        Recent Ratings

      </h2>

      <div className="ratingGrid">

        {ratings
          .slice(0, 5)
          .map(movie => (

            <div
              key={movie.movieId}
              className="ratingCard"
            >

              <h4>

                {movie.title}

              </h4>

              <p>

                {"⭐".repeat(
                  movie.rating
                )}

              </p>

            </div>

          ))}

      </div>

    </div>

  );

}

export default Profile;