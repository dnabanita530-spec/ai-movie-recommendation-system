

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip
} from "chart.js";

import {
  Bar,
  Doughnut
} from "react-chartjs-2";

import {
  useEffect,
  useState
} from "react";

import {
  getPerformance
} from "../../services/recommendationPerformanceService";

import "./RecommendationPerformance.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function RecommendationPerformance() {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    // eslint-disable-next-line react-hooks/immutability
    loadData();

  }, []);

  const loadData = async () => {

    const data = await getPerformance();

    console.log(data);

    setStats(data);

  };

  if (!stats) {

    return (

      <div className="performancePage">

        <h2>Loading...</h2>

      </div>

    );

  }

  const doughnutData = {

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

  const barData = {

    labels:

      stats.topUsers.map(

        user => user.user

      ),

    datasets: [

      {

        label:

          "Recommendations",

        data:

          stats.topUsers.map(

            user => user.count

          ),

        backgroundColor:

          "#8b5cf6"

      }

    ]

  };

  return (

    <div className="performancePage">

      <h1>

        📊 Recommendation Performance

      </h1>

      {/* Cards */}

      <div className="cardGrid">

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

        <div className="card">

          <h2>

            {stats.activeUsers}

          </h2>

          <p>

            👥 Active Users

          </p>

        </div>

        <div className="card">

          <h2>

            {stats.averagePerUser}

          </h2>

          <p>

            📈 Avg/User

          </p>

        </div>

        <div className="card">

          <h2>

            {stats.mostActiveUser}

          </h2>

          <p>

            👤 Most Active

          </p>

        </div>

        <div className="card">

          <h2>

            {stats.mostRecommendedMovie}

          </h2>

          <p>

            🏆 Top Movie

          </p>

        </div>

        <div className="card">

          <h2>

            {stats.lastRecommendation}

          </h2>

          <p>

            🕒 Last Recommendation

          </p>

        </div>

      </div>

      {/* Charts */}

      <div className="charts">

        <div className="chart">

          <h2>

            Recommendation Types

          </h2>

          <Doughnut

            data={doughnutData}

            options={{

              responsive:true,

              maintainAspectRatio:false

            }}

          />

        </div>

        <div className="chart">

          <h2>

            Top Active Users

          </h2>

          <Bar

            data={barData}

            options={{

              responsive:true,

              maintainAspectRatio:false

            }}

          />

        </div>

      </div>

      {/* Performance Table */}

      <div className="tableCard">

        <h2>

          Performance Summary

        </h2>

        <table>

          <tbody>

            <tr>

              <td>Total Recommendations</td>

              <td>{stats.totalRecommendations}</td>

            </tr>

            <tr>

              <td>Hybrid</td>

              <td>{stats.hybridCount}</td>

            </tr>

            <tr>

              <td>Content</td>

              <td>{stats.contentCount}</td>

            </tr>

            <tr>

              <td>Active Users</td>

              <td>{stats.activeUsers}</td>

            </tr>

            <tr>

              <td>Average/User</td>

              <td>{stats.averagePerUser}</td>

            </tr>

            <tr>

              <td>Most Active User</td>

              <td>{stats.mostActiveUser}</td>

            </tr>

            <tr>

              <td>Most Recommended Movie</td>

              <td>{stats.mostRecommendedMovie}</td>

            </tr>

            <tr>

              <td>Last Recommendation</td>

              <td>{stats.lastRecommendation}</td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* History */}

      <div className="tableCard">

        <h2>

          Recent Recommendation History

        </h2>

        <table>

          <thead>

            <tr>

              <th>User</th>

              <th>Type</th>

              <th>Movies</th>

              <th>Date</th>

            </tr>

          </thead>

          <tbody>

            {stats.history.map((item,index)=>(

              <tr key={index}>

                <td>{item.user}</td>

                <td>{item.type}</td>

                <td>{item.movies}</td>

                <td>{item.date}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default RecommendationPerformance;