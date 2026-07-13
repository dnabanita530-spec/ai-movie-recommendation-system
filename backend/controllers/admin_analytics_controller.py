from fastapi import APIRouter
import pandas as pd
from sqlalchemy.orm import Session

from config.database import SessionLocal
from models.user_model import User

router = APIRouter(
    prefix="/admin/analytics",
    tags=["Admin Analytics"]
)

movies_df = pd.read_csv(
    "data/enriched_movies.csv"
)

ratings_df = pd.read_csv(
    "data/ratings.csv"
)
@router.get("/")
def get_analytics():

    db = SessionLocal()

    total_movies = len(
    movies_df
)

    total_users = len(
    ratings_df["userId"]
    .unique()
)

    total_ratings = len(
    ratings_df
)

    active_users = (
    db.query(User)
    .count()
)

    top_movies = (
        ratings_df
        .groupby("movieId")
        ["rating"]
        .mean()
        .sort_values(
            ascending=False
        )
        .head(5)
    )

    movie_names = []

    for movie_id in top_movies.index:

        movie = movies_df[
            movies_df["movieId"]
            == movie_id
        ]

        if not movie.empty:

            movie_names.append(
                movie.iloc[0]["title"]
            )

    genre_count = {}

    for genres in movies_df[
        "genres"
    ]:

        for genre in genres.split("|"):

            genre_count[
                genre
            ] = (
                genre_count.get(
                    genre,
                    0
                ) + 1
            )

    return {

        "totalMovies":
        total_movies,

        "totalUsers":
        total_users,

        "totalRatings":
        total_ratings,

        "activeUsers":
        active_users,

        "topMovies":
        movie_names,

        "genreDistribution":
        genre_count

    }