import { useEffect, useState } from "react";

import {
  getHistory
} from "../../services/historyService";
import "./History.css";

function History() {

  const [history,
    setHistory] =
      useState([]);


  useEffect(() => {

    // eslint-disable-next-line react-hooks/immutability
    loadHistory();

}, []);

const loadHistory = async () => {

  try {

    const username =
      localStorage.getItem("username");

    const data =
      await getHistory(username);

    setHistory(data);

  }

  catch (error) {

    console.error(error);

  }

};

  return (

    <div className="historyPage">

      <h1>
        Recently Viewed Movies
      </h1>

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

    </div>

  );

}

export default History;