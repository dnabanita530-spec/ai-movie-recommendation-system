import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from "chart.js";
import {
  useEffect,
  useState
} from "react";
import {
  Doughnut,
  Line
} from "react-chartjs-2";
import { Link } from "react-router-dom";

import {
  getAdminStats
} from "../../services/adminService";

import "./AdminDashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function AdminDashboard() {

// const [stats, setStats] =
//   useState({

//     totalMovies: 0,
//     totalUsers: 0,
//     totalReviews: 0,
//     activeUsers: 0,

//     topMovies: [],

//     genreDistribution: {}

//   });
const [stats, setStats] = useState({

    totalMovies:0,

    totalUsers:0,

    totalRatings:0,

    totalReviews:0,

    totalFavorites:0,

    totalHistory:0,

    totalRecommendations:0,

    activeUsers:0,

    topMovies:[],

    genreDistribution:{},

    recentActivities:[]

});
useEffect(() => {

  // eslint-disable-next-line react-hooks/immutability
  loadStats();

}, []);


const loadStats = async () => {

  const data = await getAdminStats();

  console.log("ADMIN DATA:", data);

  setStats(data);

};
  const trafficData = {

    labels: [
      "Jan","Feb","Mar",
      "Apr","May","Jun",
      "Jul","Aug","Sep",
      "Oct","Nov","Dec"
    ],

    datasets: [

      {
        label:
          "Monthly Traffic",

        data: [
          12,18,15,24,28,22,
          31,26,35,40,32,38
        ],

        borderColor:
          "#8b5cf6",

        tension: 0.4
      }

    ]

  };
  if (!stats) {

  return (
    <h2 style={{ color: "white" }}>
      Loading Dashboard...
    </h2>
  );

}

const genreData = {

  labels: Object.keys(
    stats?.genreDistribution || {}
  ),

  datasets: [

    {
      data: Object.values(
        stats?.genreDistribution || {}
      ),

      backgroundColor: [

        "#8b5cf6",
        "#6366f1",
        "#ec4899",
        "#06b6d4",
        "#f59e0b",
        "#10b981",
        "#ef4444",
        "#f97316"

      ]

    }

  ]

};

  return (

    <div className="adminDashboard">

      {/* Sidebar */}

      <div className="adminSidebar">

        <h2>
          Dashboard
        </h2>

        <ul>

          <li>
  <Link to="/admin-dashboard">
    📊 Dashboard
  </Link>
</li>

<li>
  <Link to="/admin-movies">
    🎬 Movies
  </Link>
</li>

<li>
  <Link to="/admin-users">
    👥 Users
  </Link>
</li>

<li>
  <Link to="/admin-reviews">
    ⭐ Reviews
  </Link>
</li>

<li>
  <Link to="/admin-analytics">
    📈 Analytics
  </Link>
</li>
<li>

  <Link
    to="/admin-recommendations"
  >

    🎯 Recommendations

  </Link>
  

</li>

  <Link
    to="/recommendation-performance"
  >
    📊 Performance
  </Link>


<li>

  <button
    onClick={() => {

      localStorage.clear();

      window.location.href =
        "/login";

    }}
  >

    🚪 Logout

  </button>

</li>

        </ul>

      </div>

      {/* Content */}

      <div className="adminContent">

        
        <div className="statsGrid">

<div className="statCard">
<h2>{stats.totalMovies}</h2>
<p>🎬 Movies</p>
</div>

<div className="statCard">
<h2>{stats.totalUsers}</h2>
<p>👥 Users</p>
</div>

<div className="statCard">
<h2>{stats.totalRatings}</h2>
<p>⭐ Ratings</p>
</div>

<div className="statCard">
<h2>{stats.totalReviews}</h2>
<p>📝 Reviews</p>
</div>

<div className="statCard">
<h2>{stats.totalFavorites}</h2>
<p>❤️ Favorites</p>
</div>

<div className="statCard">
<h2>{stats.totalHistory}</h2>
<p>👁 Watch History</p>
</div>

<div className="statCard">
<h2>{stats.totalRecommendations}</h2>
<p>🤖 Recommendations</p>
</div>

<div className="statCard">
<h2>{stats.activeUsers}</h2>
<p>🟢 Active Users</p>
</div>

</div>

        <div className="chartsRow">

  <div className="leftSection">

    <div className="chartCard">
      <h3>📈 Monthly Traffic</h3>
      <Line data={trafficData} />
    </div>

    <div className="topMovies" >
      <h3 style={{paddingBottom:"20px"}}>🏆 Top Rated Movies</h3>

      <table className="topMoviesTable">

        <thead>

          <tr>
            <th>Rank</th>
            <th>Movie</th>
            <th>Rating</th>
          </tr>

        </thead>

        <tbody>

          {(stats.topMovies || []).map((movie,index)=>(

            <tr key={index}>

              <td>{index+1}</td>

              <td>{movie.title}</td>

              <td>⭐ {movie.rating}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

  <div className="rightSection">

    <div className="chartCard">

      <h3>🎭 Genre Distribution</h3>

      <Doughnut data={genreData} />

    </div>

    <div className="activityCard">

      <h3>📜 Recent Activities</h3>

      {(stats.recentActivities || []).map((item,index)=>(

        <div className="activityItem" key={index}>

          ✔ {item.message}

        </div>

      ))}

    </div>

  </div>

</div>

        <div className="topMovies">

          <h3 style={{paddingBottom:"20px"}}>
            Top Movies
          </h3>

<table className="topMoviesTable">

  <thead>

    
    <tr>
<th>Rank</th>
<th>Movie</th>
<th>Rating</th>
</tr>

  </thead>

 
  <tbody>

{


(stats.topMovies || []).map((movie,index)=>(
<tr key={index}>

<td>{index+1}</td>

<td>{movie.title}</td>

<td>{movie.rating}</td>

</tr>

))

}

</tbody>

</table>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;