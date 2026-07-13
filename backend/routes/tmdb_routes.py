from fastapi import APIRouter
import requests
import os

router = APIRouter(
    prefix="/tmdb",
    tags=["TMDB"]
)

API_KEY = os.getenv("TMDB_API_KEY")

@router.get("/{movie_id}")
def movie_details(movie_id: int):

    url = (
        f"https://api.themoviedb.org/3/movie/"
        f"{movie_id}"
        f"?api_key={API_KEY}"
    )

    response = requests.get(url)

    return response.json()