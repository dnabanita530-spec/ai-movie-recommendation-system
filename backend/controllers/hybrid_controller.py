from fastapi import APIRouter
import pandas as pd
from config.database import SessionLocal
from services.tmdb_service import get_movie_details
from services.recommendation_log_service import (
    RecommendationLogService
)
router = APIRouter(
    prefix="/hybrid",
    tags=["Hybrid Recommendation"]
)

movies = pd.read_csv(
    "data/movies.csv"
)

ratings = pd.read_csv(
    "data/ratings.csv"
)


@router.get("/search/{movie_name}")
def hybrid_recommendation(
    movie_name: str,
    username: str
):

    movie = movies[
        movies["title"]
        .str.contains(
            movie_name,
            case=False,
            na=False
        )
    ]

    # Movie not found in MovieLens
    if movie.empty:

        tmdb_movie = get_movie_details(movie_name)

        if tmdb_movie:
            db=SessionLocal()
            RecommendationLogService.save_log(
                db=db,
                username=username,
                rec_type="TMDB",
                movies=[movie_name]
            )
            return {
                "source": "tmdb",
                "movie": tmdb_movie
            }

        return []

    # Movie found in MovieLens
    target_movie = movie.iloc[0]

    target_id = target_movie["movieId"]

    target_genres = str(
        target_movie["genres"]
    ).split("|")

    # =============================
    # CONTENT BASED FILTERING
    # =============================

    content_movies = movies.copy()

    scores = []

    for _, row in content_movies.iterrows():

            genres = str(
                row["genres"]
            ).split("|")

            common = len(
                set(target_genres)
                &
                set(genres)
            )

            scores.append(common)

    content_movies["content_score"] = scores

    content_movies = (

            content_movies

            .sort_values(

                by="content_score",

                ascending=False

            )

            .head(50)

        )

        # =============================
        # COLLABORATIVE FILTERING
        # =============================

    target_users = ratings[

            (ratings["movieId"] == target_id)

            &

            (ratings["rating"] >= 4)

        ]["userId"]

    collaborative_movies = ratings[

            ratings["userId"]

            .isin(target_users)

        ]

    collaborative_movies = (

            collaborative_movies

            .groupby("movieId")

            ["rating"]

            .mean()

            .reset_index()

        )

    collaborative_movies = (

            collaborative_movies

            .merge(

                movies,

                on="movieId"

            )

        )

    collaborative_movies.rename(

            columns={

                "rating":
                "collab_score"

            },

            inplace=True

        )

        # =============================
        # DEMOGRAPHIC FILTERING
        # =============================

    demographic_movies = (

            ratings

            .groupby("movieId")

            ["rating"]

            .mean()

            .reset_index()

        )

    demographic_movies = (

            demographic_movies

            .merge(

                movies,

                on="movieId"

            )

        )

    demographic_movies.rename(

            columns={

                "rating":
                "demo_score"

            },

            inplace=True

        )

        # =============================
        # HYBRID MERGE
        # =============================

    hybrid = (

            collaborative_movies

            .merge(

                demographic_movies[
                    [
                        "movieId",
                        "demo_score"
                    ]
                ],

                on="movieId",

                how="left"

            )

        )

    hybrid = (

            hybrid

            .merge(

                content_movies[
                    [
                        "movieId",
                        "content_score"
                    ]
                ],

                on="movieId",

                how="left"

            )

        )

    hybrid.fillna(
            0,
            inplace=True
        )

    hybrid["hybrid_score"] = (

            hybrid["collab_score"] * 0.5

            +

            hybrid["content_score"] * 0.3

            +

            hybrid["demo_score"] * 0.2

        )

    hybrid = hybrid[

            hybrid["movieId"]
            != target_id

        ]

    hybrid = (

            hybrid

            .sort_values(

                by="hybrid_score",

                ascending=False

            )

            .head(20)

        )

        # return hybrid[
        #     [
        #         "movieId",
        #         "title",
        #         "genres",
        #         "hybrid_score"
        #     ]
        # ].to_dict(
        #     orient="records"
        # )
        
    recommended_movies = hybrid[
        [
            "movieId",
            "title",
            "genres",
            "hybrid_score"
        ]
    ].to_dict(
        orient="records"
    )

    db = SessionLocal()

    movie_titles = [
        movie["title"]
        for movie in recommended_movies
    ]

    RecommendationLogService.save_log(
    db=db,
    username=username,
    rec_type="Hybrid",
    movies=movie_titles
)

    return recommended_movies