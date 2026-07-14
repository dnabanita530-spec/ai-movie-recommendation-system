from fastapi import APIRouter
from config.database import SessionLocal

from models.review_model import Review
from models.user_model import User

router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"]
)


@router.post("/")
def add_review(data: dict):

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

        review = (
            db.query(Review)
            .filter(
                Review.user_id == user.id,
                Review.movie_id == data["movieId"]
            )
            .first()
     )

        if review:

            review.review = data["review"]

        else:

            review = Review(

                user_id=user.id,

                movie_id=data["movieId"],

                title=data["title"],

                review=data["review"]

            )

            db.add(review)

        db.commit()

        return {
            "message": "Review Saved"
        }
    finally:

        db.close()


@router.get("/{username}")
def get_reviews(username: str):

    db = SessionLocal()
    try:
        user = (
            db.query(User)
            .filter(User.name == username)
            .first()
        )

        if not user:
            return []

        reviews = (
            db.query(Review)
            .filter(
                Review.user_id == user.id
            )
            .all()
        )

        return [

            {
                "movieId": r.movie_id,
                "title": r.title,
                "review": r.review
            }

            for r in reviews

        ]
    finally:

        db.close()


@router.delete("/{username}/{movie_id}")
def remove_review(
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

        review = (
            db.query(Review)
            .filter(
                Review.user_id == user.id,
                Review.movie_id == movie_id
            )
            .first()
        )

        if review:

            db.delete(review)

            db.commit()

        return {
            "message": "Deleted"
        }
    finally:

        db.close()