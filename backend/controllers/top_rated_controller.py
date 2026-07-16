
from fastapi import APIRouter
import pandas as pd

from services.tmdb_service import get_movie_details

router = APIRouter(
    prefix="/top-rated",
    tags=["Top Rated"]
)

movies = pd.read_csv("data/movies.csv")
ratings = pd.read_csv("data/ratings.csv")


@router.get("/")
def get_top_rated():

    avg_ratings = (
        ratings.groupby("movieId")["rating"]
        .mean()
        .reset_index()
    )

    top_movies = (
        movies.merge(
            avg_ratings,
            on="movieId"
        )
        .sort_values(
            by="rating",
            ascending=False
        )
        .head(20)
    )

    result = []

    for _, row in top_movies.iterrows():

        tmdb = get_movie_details(row["title"])

        result.append({

            "movieId": int(row["movieId"]),

            "title": row["title"],

            "genres": row["genres"],

            "rating": round(float(row["rating"]), 1),

            "poster": tmdb.get("poster", ""),

            "language": tmdb.get("language", ""),

            "release_date": tmdb.get("release_date", "")

        })

    return result