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

const [stats, setStats] =
  useState({

    totalMovies: 0,
    totalUsers: 0,
    totalReviews: 0,
    activeUsers: 0,

    topMovies: [],

    genreDistribution: {}

  });
useEffect(() => {

  loadStats();

}, []);

const loadStats = async () => {

  const data =
    await getAdminStats();

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
<li>
  <Link to="/settings">
    ⚙ Settings
  </Link>
</li>
  <Link
    to="/recommendation-performance"
  >
    📊 Performance
  </Link>

{/* <li>
  <Link to="/login">
    🚪 Logout
  </Link>
</li> */}
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
           <h2>
  {stats?.totalMovies || 0}
</h2>
            <p>Total Movies</p>
          </div>

          <div className="statCard">
            <h2>
              {stats?.totalUsers || 0}
            </h2>
            <p>Total Users</p>
          </div>

          <div className="statCard">
            <h2>
             {stats?.totalReviews || 0}
            </h2>
            <p>Total Reviews</p>
          </div>

          <div className="statCard">
            <h2>
              {stats?.activeUsers || 0}
            </h2>
            <p>Active Users</p>
          </div>

        </div>

        <div className="chartsRow">

          <div className="chartCard">

            <h3>
              Monthly Traffic
            </h3>

            <Line
              data={trafficData}
            />

          </div>

          <div className="chartCard">

            <h3>
              Genre Distribution
            </h3>

            <Doughnut
              data={genreData}
            />

          </div>
          <div className="activityCard">

  <h3>Recent Activity</h3>

  <p>✔ New Ratings Added</p>

  <p>✔ New Users Joined</p>

  <p>✔ Recommendations Generated</p>

</div>

        </div>

        <div className="topMovies">

          <h3>
            Top Movies
          </h3>

<table className="topMoviesTable">

  <thead>

    <tr>
      <th>Rank</th>
      <th>Movie</th>
    </tr>

  </thead>

  <tbody>

    {stats.topMovies.map(
      (movie,index) => (

        <tr key={index}>

          <td>{index + 1}</td>

          <td>{movie.title}</td>

        </tr>

      )
    )}

  </tbody>

</table>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;