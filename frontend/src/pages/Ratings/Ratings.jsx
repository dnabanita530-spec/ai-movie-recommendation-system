import { useEffect, useState } from "react";
import {
    getRatings,
    removeRating
} from "../../services/ratingService";
import "./Ratings.css";

function Ratings() {

    const [ratings, setRatings] = useState([]);

    useEffect(() => {

        // eslint-disable-next-line react-hooks/immutability
        loadRatings();

    }, []);

    const loadRatings = async () => {

        const username =
            localStorage.getItem("username");

        const data =
            await getRatings(username);

        setRatings(data);

    };

    const deleteRating = async (movieId) => {

        const username =
            localStorage.getItem("username");

        await removeRating(

            username,

            movieId

        );

        loadRatings();

    };

    return (

        <div className="ratingsPage">

            <h1>

                ⭐ My Ratings

            </h1>

            {

                ratings.length === 0 ?

                    (

                        <h3>

                            No Ratings Yet

                        </h3>

                    )

                    :

                    (

                        <div className="ratingsGrid">

                            {

                                ratings.map(movie => (

                                    <div

                                        key={movie.movieId}

                                        className="ratingCard"

                                    >

                                        <h3>

                                            {movie.title}

                                        </h3>

                                        <h2>

                                            ⭐ {movie.rating}/5

                                        </h2>

                                        <button

                                            onClick={() =>

                                                deleteRating(movie.movieId)

                                            }

                                        >

                                            Delete

                                        </button>

                                    </div>

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

}

export default Ratings;