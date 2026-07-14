from fastapi import APIRouter
from config.database import SessionLocal

from models.favorite_model import Favorite
from models.user_model import User

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
            .filter(
                Favorite.user_id == user.id
            )
            .all()
        )

        return [

            {
                "movieId": movie.movie_id,
                "title": movie.title,
                "poster": movie.poster
            }

            for movie in favorites

        ]
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