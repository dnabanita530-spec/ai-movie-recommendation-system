from fastapi import APIRouter
from config.database import SessionLocal

from models.rating_model import Rating
from models.user_model import User

router = APIRouter(
    prefix="/ratings",
    tags=["Ratings"]
)


@router.post("/")
def add_rating(data: dict):

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

        rating = (
            db.query(Rating)
            .filter(
                Rating.user_id == user.id,
                Rating.movie_id == data["movieId"]
            )
            .first()
        )

        if rating:

            rating.rating = data["rating"]

        else:

            rating = Rating(

                user_id=user.id,

                movie_id=data["movieId"],

                title=data["title"],

                rating=data["rating"]

            )

            db.add(rating)

        db.commit()

        return {
            "message": "Rating Saved"
        }
    finally:
        db.close()


@router.get("/{username}")
def get_ratings(username: str):

    db = SessionLocal()
    try:
        user = (
            db.query(User)
            .filter(User.name == username)
            .first()
        )

        if not user:
            return []

        ratings = (
            db.query(Rating)
            .filter(
                Rating.user_id == user.id
            )
            .all()
        )

        return [

            {
                "movieId": r.movie_id,
                "title": r.title,
                "rating": r.rating
            }

            for r in ratings

        ]
    finally:    
        db.close()


@router.delete("/{username}/{movie_id}")
def remove_rating(
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

        rating = (
            db.query(Rating)
            .filter(
                Rating.user_id == user.id,
                Rating.movie_id == movie_id
            )
            .first()
        )

        if rating:

            db.delete(rating)

            db.commit()

        return {
            "message": "Deleted"
        }
    finally:
        db.close()