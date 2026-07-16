import {
  useEffect,
  useState
} from "react";

import {
  Doughnut
} from "react-chartjs-2";

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip
} from "chart.js";

import {
  getRecommendations
} from "../../services/adminRecommendationService";

import "./AdminRecommendations.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function AdminRecommendations() {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    // eslint-disable-next-line react-hooks/immutability
    loadRecommendations();

  }, []);

  const loadRecommendations = async () => {

    const data = await getRecommendations();

    console.log(data);

    setStats(data);

  };

  if (!stats) {

    return (
      <div className="recommendationPage">
        <h2>Loading...</h2>
      </div>
    );

  }

  const chartData = {

    labels: [

      "Hybrid",

      "Content"

    ],

    datasets: [

      {

        data: [

          stats.hybridCount,

          stats.contentCount

        ],

        backgroundColor: [

          "#8b5cf6",

          "#06b6d4"

        ]

      }

    ]

  };

  return (

    <div className="recommendationPage">

      <h1>

        🎯 Recommendation Monitoring

      </h1>

      {/* Cards */}

      <div className="cardsGrid">

        <div className="card">

          <h2>

            {stats.totalRecommendations}

          </h2>

          <p>

            🤖 Total Recommendations

          </p>

        </div>

        <div className="card">

          <h2>

            {stats.totalUsers}

          </h2>

          <p>

            👥 Users

          </p>

        </div>

        <div className="card">

          <h2>

            {stats.hybridCount}

          </h2>

          <p>

            ⭐ Hybrid

          </p>

        </div>

        <div className="card">

          <h2>

            {stats.contentCount}

          </h2>

          <p>

            🎬 Content

          </p>

        </div>

      </div>

      {/* Charts */}

      <div className="chartSection">

        <div className="chartCard">

          <h3>

            Recommendation Types

          </h3>

         <div className="doughnutWrapper">
    <Doughnut
        data={chartData}
        options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: "60%",
            plugins: {
                legend: {
                    position: "top"
                }
            }
        }}
    />
</div>

        </div>

        <div className="topMovieCard">

          <h3>

            Top Recommended Movies

          </h3>

          <table>

            <thead>

              <tr>

                <th>

                  Rank

                </th>

                <th>

                  Movie

                </th>

                <th>

                  Count

                </th>

              </tr>

            </thead>

            <tbody>

              {stats.topMovies.map(

                (movie, index) => (

                  <tr key={index}>

                    <td>

                      {index + 1}

                    </td>

                    <td>

                      {movie.title}

                    </td>

                    <td>

                      {movie.count}

                    </td>

                  </tr>

                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Recommendation Log */}

      <div className="logCard">

        <h2>

          Recommendation Log

        </h2>

        <table className="recommendationTable">

          <thead>

            <tr>

              <th>User</th>

              <th>Type</th>

              <th>Movies</th>

              <th>Date</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {stats.logs.map(

              (log, index) => (

                <tr key={index}>

                  <td>

                    {log.user}

                  </td>

                  <td>

                    {log.type}

                  </td>

                  <td>

                    {log.movies.join(", ")}

                  </td>

                  <td>

                    {log.date}

                  </td>

                  <td>

                    ✅ {log.status}

                  </td>

                </tr>

              )

            )}

          </tbody>

        </table>

      </div>

      {/* Activities */}

      <div className="activityCard">

        <h2>

          Recent Activities

        </h2>

        {stats.activities.map(

          (activity, index) => (

            <p key={index}>

              ✔ {activity}

            </p>

          )

        )}

      </div>

    </div>

  );

}

export default AdminRecommendations;