from fastapi import APIRouter
import pandas as pd
import requests
import re
from services.tmdb_cache import load_tmdb_cache, save_tmdb_cache

from services.hybrid_recommender import hybrid_recommend
router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)

TMDB_API_KEY = "a2e02779d65925a649c2e422a44819b6"

movies = pd.read_csv("data/movies.csv")
tmdb_cache = load_tmdb_cache()

def get_tmdb_data(title):
  
    global tmdb_cache

    if title in tmdb_cache:

        return tmdb_cache[title]

    clean_title = re.sub(
        r"\(\d{4}\)",
        "",
        title
    ).strip()

    if clean_title.endswith(", The"):
        clean_title = "The " + clean_title[:-5]

    elif clean_title.endswith(", A"):
        clean_title = "A " + clean_title[:-3]

    elif clean_title.endswith(", An"):
        clean_title = "An " + clean_title[:-4]

    year = ""

    match = re.search(r"\((\d{4})\)", title)

    if match:

        year = match.group(1)

    try:

        response = requests.get(

            "https://api.themoviedb.org/3/search/movie",

            params={

                "api_key": TMDB_API_KEY,

                "query": clean_title,

                "year": year

            },

            timeout=10

        )

        data = response.json()

        print("Searching:", clean_title)

        print("Results:", len(data.get("results", [])))

        if data.get("results"):

            # movie = data["results"][0]
            movie = None
            for m in data["results"]:
                tmdb_year = ""
                if m.get("release_date"):
                    tmdb_year = m["release_date"][:4]
                if (
                    m["title"].lower() == clean_title.lower()
                    and
                    tmdb_year == year
                ):
                    movie = m
                    break
                if movie is None:
                    for m in data["results"]:
                        if clean_title.lower() in m["title"].lower():
                            movie = m
                            break
                if movie is None and data["results"]:
                    movie = data["results"][0]
                    
            result = {

                "poster":

                "https://image.tmdb.org/t/p/w500"

                + movie["poster_path"]

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

            tmdb_cache[title] = result

            save_tmdb_cache(tmdb_cache)

            return result

    except Exception as e:

        print("TMDB ERROR:", e)

    return {

        "poster":

        "https://dummyimage.com/300x450/111827/ffffff&text=Movie",

        "rating":0,

        "language":"en",

        "overview":"Overview not available.",

        "release_date":""

    }


@router.get("/{movie_id}")
def recommend_movies(movie_id: int):

    selected_movie = movies[
        movies["movieId"] == movie_id
    ]

    if selected_movie.empty:
        return []

    movie_title = selected_movie.iloc[0]["title"]

    # recommended_titles = content_recommend(
    #     movie_title,
    #     n=20
    # )
    
    recommended_movies = hybrid_recommend(
        movie_title,
        user_id=1,
        n=20
    )

    result = []

    # for title in recommended_titles:

    #     movie = movies[
    #         movies["title"] == title
    #     ]

    #     if movie.empty:
    #         continue

    #     row = movie.iloc[0]

    #     tmdb = get_tmdb_data(row["title"])

    #     result.append({

    #         "movieId": int(row["movieId"]),

    #         "title": row["title"],

    #         "genres": row["genres"],

    #         "poster": tmdb["poster"],

    #         "rating": tmdb["rating"],

    #         "language": tmdb["language"],

    #         "overview": tmdb["overview"],

    #         "release_date": tmdb["release_date"]

    #     })
    for _, row in recommended_movies.iterrows():
  
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