import {
  useEffect,
  useState
} from "react";

import {
  getPerformance
} from "../../services/performanceService";

import "./RecommendationPerformance.css";

function RecommendationPerformance() {

  const [stats,setStats] =
    useState({});

  useEffect(() => {

    loadData();

  }, []);

  const loadData =
    async () => {

      const data =
        await getPerformance();

      setStats(data);

    };

  return (

    <div
      className="performancePage"
    >

      <h1>
        📊 Recommendation Performance
      </h1>

      <div
        className="performanceGrid"
      >

        <div
          className="performanceCard"
        >

          <h2>
            {
              stats.totalRecommendations
            }
          </h2>

          <p>
            Total Recommendations
          </p>

        </div>

        <div
          className="performanceCard"
        >

          <h2>
            {
              stats.hybridRecommendations
            }
          </h2>

          <p>
            Hybrid Recommendations
          </p>

        </div>

        <div
          className="performanceCard"
        >

          <h2>
            {
              stats.mostActiveUser
            }
          </h2>

          <p>
            Most Active User
          </p>

        </div>

        <div
          className="performanceCard"
        >

          <h2>
            {
              stats.mostRecommendedMovie
            }
          </h2>

          <p>
            Most Recommended Movie
          </p>

        </div>

      </div>

    </div>

  );

}

export default RecommendationPerformance;