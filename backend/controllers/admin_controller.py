from fastapi import APIRouter
import pandas as pd

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

movies_df = pd.read_csv("data/movies.csv")
ratings_df = pd.read_csv("data/ratings.csv")
from fastapi import Body

@router.post("/movies")
def add_movie(movie: dict = Body(...)):

    global movies_df

    movies_df.loc[len(movies_df)] = [
        movie["movieId"],
        movie["title"],
        movie["genres"]
    ]

    movies_df.to_csv(
        "data/movies.csv",
        index=False
    )

    return {
        "message": "Movie Added Successfully"
    }
@router.get("/stats")
def get_admin_stats():

    total_movies = len(movies_df)

    total_reviews = len(ratings_df)

    total_users = ratings_df["userId"].nunique()

    active_users = (
        ratings_df.groupby("userId")
        .size()
        .gt(10)
        .sum()
    )

    top_movies = (

        ratings_df
        .groupby("movieId")["rating"]
        .mean()
        .reset_index()
        .sort_values(
            "rating",
            ascending=False
        )
        .head(5)
    )

    top_movies = top_movies.merge(
        movies_df,
        on="movieId"
    )

    genres = {}

    for genre_string in movies_df["genres"]:

        for genre in genre_string.split("|"):

            genres[genre] = (
                genres.get(genre, 0) + 1
            )

    return {

        "totalMovies":
        int(total_movies),

        "totalUsers":
        int(total_users),

        "totalReviews":
        int(total_reviews),

        "activeUsers":
        int(active_users),

        "topMovies":
        top_movies[
            ["title"]
        ].to_dict(
            orient="records"
        ),

        "genreDistribution":
        genres

    }