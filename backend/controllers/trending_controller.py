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

    rating_count = (
        ratings.groupby("movieId")
        .size()
        .reset_index(name="rating_count")
    )

    trending = (
        movies.merge(
            rating_count,
            on="movieId"
        )
        .sort_values(
            "rating_count",
            ascending=False
        )
        .head(20)
    )

    return trending[
        ["movieId", "title", "genres"]
    ].to_dict(
        orient="records"
    )
    