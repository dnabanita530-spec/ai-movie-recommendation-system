from fastapi import APIRouter
from config.database import SessionLocal

from models.favorite_model import Favorite
from models.user_model import User
import pandas as pd

movies_df = pd.read_csv("data/enriched_movies.csv")
ratings_df = pd.read_csv("data/ratings.csv")
router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"]
)


@router.post("/")
def add_favorite(data: dict):

    db = SessionLocal()
    try:
        user = (
            db.query(User)
            .filter(User.name == data["username"])
            .first()
        )

        if not user:
            return {
                "message": "User not found"
            }

        exists = (
            db.query(Favorite)
            .filter(
                Favorite.user_id == user.id,
                Favorite.movie_id == data["movieId"]
            )
            .first()
        )

        if exists:
            return {
                "message": "Already in favorites"
            }

        favorite = Favorite(

            user_id=user.id,

            movie_id=data["movieId"],

            title=data["title"],

            poster=data["poster"]

        )

        db.add(favorite)

        db.commit()

        db.refresh(favorite)

        return {
            "message": "Added successfully"
        }
    finally:
        db.close()




@router.get("/{username}")
def get_favorites(username: str):

    db = SessionLocal()

    try:

        user = (
            db.query(User)
            .filter(User.name == username)
            .first()
        )

        if not user:
            return []

        favorites = (
            db.query(Favorite)
            .filter(Favorite.user_id == user.id)
            .all()
        )

        result = []

        for fav in favorites:

            movie = movies_df[
                movies_df["movieId"] == fav.movie_id
            ]

            genres = "Genres not available"

            if not movie.empty:
                genres = movie.iloc[0]["genres"]

            movie_ratings = ratings_df[
                ratings_df["movieId"] == fav.movie_id
            ]["rating"]

            rating = (
                round(movie_ratings.mean(), 1)
                if not movie_ratings.empty
                else 0
            )

            result.append({

                "movieId": fav.movie_id,

                "title": fav.title,

                "poster": fav.poster,

                "genres": genres,

                "rating": rating

            })

        return result

    finally:
        db.close()
@router.delete("/{username}/{movie_id}")
def remove_favorite(

    username: str,

    movie_id: int

):

    db = SessionLocal()
    try:
        user = (
            db.query(User)
            .filter(User.name == username)
            .first()
        )

        if not user:
            return {
                "message": "User not found"
            }

        favorite = (
            db.query(Favorite)
            .filter(
                Favorite.user_id == user.id,
                Favorite.movie_id == movie_id
            )
            .first()
        )

        if favorite:

            db.delete(favorite)

            db.commit()

        return {
            "message": "Removed"
        }
    finally:
        db.close()