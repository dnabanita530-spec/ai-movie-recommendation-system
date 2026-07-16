import { useEffect, useState } from "react";

import "./Dashboard.css";

function Dashboard() {

  const [favorites,
    setFavorites] =
      useState([]);

  const [ratings,
    setRatings] =
      useState([]);

  const [history,
    setHistory] =
      useState([]);

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  return (

    <div className="dashboardPage">

      <h1>
        Hybrid Recommendation Dashboard
      </h1>

      <div className="statsGrid">

        <div className="statCard">

          <h2>
            {favorites.length}
          </h2>

          <p>
            Favorite Movies
          </p>

        </div>

        <div className="statCard">

          <h2>
            {ratings.length}
          </h2>

          <p>
            Rated Movies
          </p>

        </div>

        <div className="statCard">

          <h2>
            {history.length}
          </h2>

          <p>
            Watched Movies
          </p>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;


