from fastapi import APIRouter
import pandas as pd

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

    return top_movies.to_dict(
        orient="records"
    )