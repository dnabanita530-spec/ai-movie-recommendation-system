from fastapi import APIRouter
import pandas as pd
import requests
import re

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)

TMDB_API_KEY = "a2e02779d65925a649c2e422a44819b6"

movies = pd.read_csv("data/movies.csv")


def get_tmdb_data(title):

    try:

        clean_title = re.sub(
            r"\(\d{4}\)",
            "",
            title
        ).strip()

        url = (
            "https://api.themoviedb.org/3/search/movie"
            f"?api_key={TMDB_API_KEY}"
            f"&query={clean_title}"
        )

        response = requests.get(url, timeout=5)

        data = response.json()

        if data.get("results"):

            movie = data["results"][0]

            return {

                "poster":
                (
                    "https://image.tmdb.org/t/p/w500"
                    + movie["poster_path"]
                )
                if movie.get("poster_path")
                else "https://dummyimage.com/300x450/111827/ffffff&text=Movie",

                "rating":
                movie.get("vote_average", 0),

                "language":
                movie.get("original_language", "en"),

                "overview":
                movie.get(
                    "overview",
                    "Overview not available."
                ),

                "release_date":
                movie.get(
                    "release_date",
                    ""
                )

            }

    except Exception:
        pass

    return {

        "poster":
        "https://dummyimage.com/300x450/111827/ffffff&text=Movie",

        "rating": 0,

        "language": "en",

        "overview": "Overview not available.",

        "release_date": ""

    }


@router.get("/{movie_id}")
def recommend_movies(movie_id: int):

    selected_movie = movies[
        movies["movieId"] == movie_id
    ]

    if selected_movie.empty:
        return []

    genres = selected_movie.iloc[0]["genres"]

    recommendations = movies[
        movies["genres"].str.contains(
            "|".join(genres.split("|")),
            case=False,
            na=False
        )
    ]

    recommendations = recommendations[
        recommendations["movieId"] != movie_id
    ]

    result = []

    for _, row in recommendations.head(20).iterrows():

        tmdb = get_tmdb_data(row["title"])

        result.append({

            "movieId": int(row["movieId"]),

            "title": row["title"],

            "genres": row["genres"],

            "poster": tmdb["poster"],

            "rating": tmdb["rating"],

            "language": tmdb["language"],

            "overview": tmdb["overview"],

            "release_date": tmdb["release_date"]

        })

    return result