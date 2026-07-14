from fastapi import APIRouter

from config.database import SessionLocal

from models.history_model import WatchHistory
from models.user_model import User

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.post("/")
def add_history(data: dict):

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

            db.query(WatchHistory)

            .filter(

                WatchHistory.user_id == user.id,

                WatchHistory.movie_id == data["movieId"]

            )

            .first()

        )

        if exists:

            return {
                "message": "Already Exists"
            }

        history = WatchHistory(

            user_id=user.id,

            movie_id=data["movieId"],

            title=data["title"],

            poster=data["poster"]

        )

        db.add(history)

        db.commit()

        return {

            "message": "Added"

        }
    finally:
        db.close()


@router.get("/{username}")
def get_history(username: str):

    db = SessionLocal()
    try:

        user = (

            db.query(User)

            .filter(User.name == username)

            .first()

        )

        if not user:

            return []

        movies = (

            db.query(WatchHistory)

            .filter(

                WatchHistory.user_id == user.id

            )

            .order_by(

                WatchHistory.watched_at.desc()

            )

            .all()

        )

        return [

            {

                "movieId": movie.movie_id,

                "title": movie.title,

                "poster": movie.poster

            }

            for movie in movies

        ]
    finally:
        db.close()


@router.delete("/{username}/{movie_id}")
def remove_history(

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

            return

        movie = (

            db.query(WatchHistory)

            .filter(

                WatchHistory.user_id == user.id,

                WatchHistory.movie_id == movie_id

            )

            .first()

        )

        if movie:

            db.delete(movie)

            db.commit()

        return {

            "message": "Deleted"

        }
    finally:
        db.close()