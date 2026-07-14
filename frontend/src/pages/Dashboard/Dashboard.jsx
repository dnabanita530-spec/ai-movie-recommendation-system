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


// import { useEffect, useState } from "react";

// import { getFavorites } from "../../services/favoriteService";
// import { getHistory } from "../../services/historyService";
// import { getRatings } from "../../services/ratingService";
// import { getReviews } from "../../services/reviewService";

// import "./Dashboard.css";

// function Dashboard() {

//   const [favorites, setFavorites] = useState([]);
//   const [ratings, setRatings] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {

//     loadDashboard();

//   }, []);

//   const loadDashboard = async () => {

//     try {

//       const username =
//         localStorage.getItem("username");

//       if (!username) return;

//       const [
//         favoriteData,
//         ratingData,
//         historyData,
//         reviewData
//       ] = await Promise.all([

//         getFavorites(username),

//         getRatings(username),

//         getHistory(username),

//         getReviews(username)

//       ]);

//       setFavorites(favoriteData);

//       setRatings(ratingData);

//       setHistory(historyData);

//       setReviews(reviewData);

//     }

//     catch (error) {

//       console.error(error);

//     }

//   };

//   return (

//     <div className="dashboardPage">

//       <h1>

//         Hybrid Recommendation Dashboard

//       </h1>

//       <div className="statsGrid">

//         <div className="statCard">

//           <h2>{favorites.length}</h2>

//           <p>Favorite Movies</p>

//         </div>

//         <div className="statCard">

//           <h2>{ratings.length}</h2>

//           <p>Rated Movies</p>

//         </div>

//         <div className="statCard">

//           <h2>{history.length}</h2>

//           <p>Watched Movies</p>

//         </div>

//         <div className="statCard">

//           <h2>{reviews.length}</h2>

//           <p>Reviews</p>

//         </div>

//       </div>

//     </div>

//   );

// }

// export default Dashboard;