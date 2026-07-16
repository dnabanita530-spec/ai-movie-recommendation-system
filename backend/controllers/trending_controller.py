
    
from fastapi import APIRouter
import pandas as pd

router = APIRouter(
    prefix="/trending",
    tags=["Trending"]
)

movies = pd.read_csv("data/movies.csv")
ratings = pd.read_csv("data/ratings.csv")


@router.get("/")
def get_trending_movies():

    rating_stats = (
        ratings.groupby("movieId")
        .agg(
            rating=("rating", "mean"),
            rating_count=("rating", "count")
        )
        .reset_index()
    )

    trending = (
        movies.merge(
            rating_stats,
            on="movieId"
        )
        .sort_values(
            by="rating_count",
            ascending=False
        )
        .head(20)
    )

    return trending[
        [
            "movieId",
            "title",
            "genres",
            "rating"
        ]
    ].to_dict(
        orient="records"
    )