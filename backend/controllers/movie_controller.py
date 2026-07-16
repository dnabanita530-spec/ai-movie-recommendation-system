
from turtle import title

from fastapi import APIRouter
import pandas as pd
import requests
import re
from urllib.parse import quote
from services.cache_service import load_cache, save_cache
router = APIRouter(
    prefix="/movies",
    tags=["Movies"]
)

TMDB_API_KEY = "a2e02779d65925a649c2e422a44819b6"

movies_df = pd.read_csv("data/movies.csv")


# ==========================================
# TMDB DETAILS
# ==========================================

import requests
import re

session = requests.Session()

IMAGE_W500 = "https://image.tmdb.org/t/p/w500"
IMAGE_W185 = "https://image.tmdb.org/t/p/w185"
IMAGE_W92 = "https://image.tmdb.org/t/p/w92"
BACKDROP = "https://image.tmdb.org/t/p/original"


def get_tmdb_data(title):

    
    year_match = re.search(r"\((\d{4})\)", title)
    year = year_match.group(1) if year_match else None

    clean_title = re.sub(r"\(\d{4}\)", "", title)

# Remove "a.k.a."
    clean_title = re.sub(
    r"\(a\.k\.a\.\s*([^)]+)\)",
    r"\1",
    clean_title,
    flags=re.IGNORECASE
)

# Remove foreign titles
    clean_title = re.sub(
    r"\((?!\d{4}\))[^)]*\)",
    "",
    clean_title
)

    clean_title = clean_title.replace(",", " ")

    clean_title = re.sub(
    r"\s+",
    " ",
    clean_title
).strip()

    try:

        params = {

            "api_key": TMDB_API_KEY,

            "query": clean_title

        }

        if year:

            params["year"] = year

        search = session.get(

            "https://api.themoviedb.org/3/search/movie",

            params=params,

            timeout=10

        )

        if search.status_code != 200:

            print(search.text)

            return {}

       
        results = search.json().get("results", [])
        if not results and year:
            retry = session.get(
                "https://api.themoviedb.org/3/search/movie",
                params={
                     "api_key": TMDB_API_KEY,
                     "query": clean_title
                },
                timeout=10
            )
            results = retry.json().get("results", [])
        if not results:
            return {}

        movie = results[0]

        movie_id = movie["id"]

        details = session.get(

            f"https://api.themoviedb.org/3/movie/{movie_id}",

            params={

                "api_key": TMDB_API_KEY

            },

            timeout=10

        ).json()

        credits = session.get(

            f"https://api.themoviedb.org/3/movie/{movie_id}/credits",

            params={

                "api_key": TMDB_API_KEY

            },

            timeout=10

        ).json()

        providers = session.get(

            f"https://api.themoviedb.org/3/movie/{movie_id}/watch/providers",

            params={

                "api_key": TMDB_API_KEY

            },

            timeout=10

        ).json()

        cast = []

        for actor in credits.get("cast", [])[:8]:

            cast.append({

                "name": actor.get("name"),

                "character": actor.get("character"),

                "profile":

                IMAGE_W185 + actor["profile_path"]

                if actor.get("profile_path")

                else ""

            })

        crew = []

        seen = set()

        for person in credits.get("crew", []):

            if person["job"] in [

                "Director",

                "Writer",

                "Screenplay",

                "Producer"

            ]:

                key = (

                    person["name"],

                    person["job"]

                )

                if key not in seen:

                    seen.add(key)

                    crew.append({

                        "name": person["name"],

                        "job": person["job"]

                    })

        watch_providers = []

        countries = providers.get("results", {})

        country = countries.get("IN")

        if not country:

            country = countries.get("US")

        if not country:

            for value in countries.values():

                if value.get("flatrate"):

                    country = value

                    break

        if country:

            for provider in country.get("flatrate", []):

                watch_providers.append({

                    "name":

                    provider["provider_name"],

                    "logo":

                    IMAGE_W92 + provider["logo_path"]

                })

        return {

            "tmdb_id": movie_id,

            "poster":

            IMAGE_W500 + movie["poster_path"]

            if movie.get("poster_path")

            else "",

            "backdrop":

            BACKDROP + movie["backdrop_path"]

            if movie.get("backdrop_path")

            else "",

            "rating":

            round(movie.get("vote_average", 0), 1),

            "overview":

            movie.get("overview", ""),

            "release_date":

            movie.get("release_date", ""),

            "runtime":

            details.get("runtime", "N/A"),

            "cast":

            cast,

            "crew":

            crew,

            "providers":

            watch_providers

        }

    except Exception as e:

        print("TMDB ERROR:", e)

        return {

            "poster": "",

            "backdrop": "",

            "rating": 0,

            "overview": "Overview not available.",

            "release_date": "",

            "runtime": "N/A",

            "cast": [],

            "crew": [],

            "providers": []

        }    
    
# ==========================================
# FAST BROWSE MOVIES
# ==========================================

# ==========================================
# FAST BROWSE MOVIES
# ==========================================

@router.get("/")
def get_movies():
    cached_movies = load_cache()

    if cached_movies:

        print("Loaded movies from cache")

        return cached_movies

    movies = []

    for _, row in movies_df.head(100).iterrows():
  
        tmdb = get_tmdb_data(row["title"])

        match = re.search(r"\((\d{4})\)", row["title"])

        year = int(match.group(1)) if match else 2000

        movies.append({

            "movieId": int(row["movieId"]),

            "title": row["title"],

            "genres": row["genres"],

            "poster": tmdb.get(
            "poster",
            "https://dummyimage.com/300x450/111827/ffffff&text=Movie"
        ),

            "rating": tmdb.get("rating", 0),

            "overview": tmdb.get(
            "overview",
            "Click to view movie details."
        ),

            "release_date": tmdb.get(
            "release_date",
            f"{year}-01-01"
        )
    })

    
    save_cache(movies)

    print("Movies cached successfully")

    return movies


# ==========================================
# MOVIE DETAILS
# ==========================================

@router.get("/{movie_id}")
def get_movie(movie_id: int):

    movie = movies_df[
        movies_df["movieId"] == movie_id
    ]

    if movie.empty:

        return {

            "success": False,

            "message": "Movie not found"

        }

    movie = movie.iloc[0]

    tmdb = get_tmdb_data(
        movie["title"]
    )

    return {

        "movieId":
        int(movie["movieId"]),

        "title":
        movie["title"],

        "genres":
        movie["genres"],

        "poster":
        tmdb.get("poster", ""),

        "backdrop":
        tmdb.get("backdrop", ""),

        "rating":
        tmdb.get("rating", 0),

        "overview":
        tmdb.get(
            "overview",
            "Overview not available."
        ),

        "release_date":
        tmdb.get("release_date", ""),

        "runtime":
        tmdb.get("runtime", "N/A"),

        "cast":
        tmdb.get("cast", []),

        "crew":
        tmdb.get("crew", []),

        "providers":
        tmdb.get("providers", [])

    }

# ==========================================
# WATCH TRAILER
# ==========================================
# ==========================================
# WATCH TRAILER
# ==========================================

@router.get("/{movie_id}/trailer")
def get_trailer(movie_id: int):

    movie = movies_df[
        movies_df["movieId"] == movie_id
    ]

    if movie.empty:

        return {
            "trailer": ""
        }

    title = movie.iloc[0]["title"]

    clean_title = re.sub(
        r"\(\d{4}\)",
        "",
        title
    ).strip()

    year_match = re.search(
        r"\((\d{4})\)",
        title
    )

    year = (
        year_match.group(1)
        if year_match
        else None
    )

    try:

        params = {

            "api_key": TMDB_API_KEY,

            "query": clean_title

        }

        if year:

            params["year"] = year

        search = session.get(

            "https://api.themoviedb.org/3/search/movie",

            params=params,

            timeout=10

        )

        if search.status_code != 200:

            raise Exception(search.text)

        results = search.json().get(
            "results",
            []
        )

        if not results:

            raise Exception("Movie not found")

        tmdb_id = results[0]["id"]

        videos = session.get(

            f"https://api.themoviedb.org/3/movie/{tmdb_id}/videos",

            params={

                "api_key": TMDB_API_KEY

            },

            timeout=10

        ).json()

        for video in videos.get(
            "results",
            []
        ):

            if (

                video.get("site") == "YouTube"

                and

                video.get("type") == "Trailer"

            ):

                return {

                    "trailer":

                    f"https://www.youtube.com/watch?v={video['key']}"

                }

    except Exception as e:

        print("Trailer Error:", e)

    return {

        "trailer":

        "https://www.youtube.com/results?search_query="

        + quote(
            f"{clean_title} official trailer"
        )

    }