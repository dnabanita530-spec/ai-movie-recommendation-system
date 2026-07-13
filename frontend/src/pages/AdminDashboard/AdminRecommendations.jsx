import {
  useEffect,
  useState
} from "react";

import {
  getRecommendations
} from "../../services/adminRecommendationService";

import "./AdminRecommendations.css";

function AdminRecommendations() {

  const [data, setData] =
    useState([]);

  useEffect(() => {

    loadRecommendations();

  }, []);

  const loadRecommendations =
    async () => {

      const res =
        await getRecommendations();

      setData(res);

    };

  return (

    <div className="recommendationPage">

      <h1>
        🎯 Recommendation Monitoring
      </h1>

      <table
        className="recommendationTable"
      >

        <thead>

          <tr>

            <th>User</th>

            <th>Type</th>

            <th>Recommended Movies</th>

          </tr>

        </thead>

        <tbody>

          {data.map(
            (item,index) => (

              <tr key={index}>

                <td>
                  {item.user}
                </td>

                <td>
                  {item.type}
                </td>

                <td>

                  {
                    item.movies.join(
                      ", "
                    )
                  }

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>

  );

}

export default AdminRecommendations;