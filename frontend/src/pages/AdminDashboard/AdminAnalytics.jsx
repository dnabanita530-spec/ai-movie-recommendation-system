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
  Doughnut,
  Line
} from "react-chartjs-2";

import {
  useEffect,
  useState
} from "react";

import {
  getAnalytics
} from "../../services/adminAnalyticsService";

import "./AdminAnalytics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function AdminAnalytics() {

  const [stats, setStats] =
    useState(null);

  useEffect(() => {

    loadAnalytics();

  }, []);

  const loadAnalytics =
    async () => {

      try {

        const data =
          await getAnalytics();

        console.log(data);

        setStats(data);

      } catch (error) {

        console.error(error);

      }

    };

  if (!stats) {

    return (

      <div
        className="analyticsPage"
      >

        <h2>
          Loading Analytics...
        </h2>

      </div>

    );

  }

  const genreData = {

    labels:
      Object.keys(
        stats.genreDistribution
      ),

    datasets: [

      {

        data:
          Object.values(
            stats.genreDistribution
          ),

        backgroundColor: [

          "#8b5cf6",
          "#6366f1",
          "#ec4899",
          "#06b6d4",
          "#f59e0b",
          "#10b981",
          "#ef4444",
          "#14b8a6",
          "#eab308",
          "#84cc16"

        ]

      }

    ]

  };

  const trafficData = {

    labels: [

      "Movies",
      "Users",
      "Ratings",
      "Active Users"

    ],

    datasets: [

      {

        label:
          "System Statistics",

        data: [

          stats.totalMovies,
          stats.totalUsers,
          stats.totalRatings,
          stats.activeUsers

        ],

        borderColor:
          "#8b5cf6",

        tension: 0.4

      }

    ]

  };

  return (

    <div className="analyticsPage">

      <h1>
        📈 Analytics Dashboard
      </h1>

      <div className="analyticsCards">

        <div className="analyticsCard">

          <h2>
            {
              stats.totalMovies
            }
          </h2>

          <p>
            Total Movies
          </p>

        </div>

        <div className="analyticsCard">

          <h2>
            {
              stats.totalUsers
            }
          </h2>

          <p>
            Total Users
          </p>

        </div>

        <div className="analyticsCard">

          <h2>
            {
              stats.totalRatings
            }
          </h2>

          <p>
            Total Ratings
          </p>

        </div>

        <div className="analyticsCard">

          <h2>
            {
              stats.activeUsers
            }
          </h2>

          <p>
            Active Users
          </p>

        </div>

      </div>

      <div className="chartsRow">

        <div className="chartCard">

          <h3>
            Platform Statistics
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

      </div>

      <div className="recommendationStats">

        <h2>
          Top Rated Movies
        </h2>

        <table>

          <thead>
<tr>

<th>Rank</th>

<th>Movie</th>

<th>Rating</th>

</tr>

          </thead>

         <tbody>

{(stats.topMovies || []).map((movie, index) => (

<tr key={index}>

<td>{index + 1}</td>

<td>{movie.title}</td>

<td>⭐ {movie.rating}</td>

</tr>

))}

</tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminAnalytics;