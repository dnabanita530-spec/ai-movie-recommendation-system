from fastapi import APIRouter
from config.database import SessionLocal
from models.user_model import User
from models.recommendation_log_model import RecommendationLog

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


@router.get("/{username}")
def get_profile(username: str):

    db = SessionLocal()

    user = (
        db.query(User)
        .filter(User.name == username)   # <-- changed
        .first()
    )

    if not user:

        return {
            "username": username,
            "email": "",
            "recommendations": 0,
            "lastSearch": "No Searches Yet"
        }

    recommendation_count = (
        db.query(RecommendationLog)
        .filter(
            RecommendationLog.username == username
        )
        .count()
    )

    latest_log = (
        db.query(RecommendationLog)
        .filter(
            RecommendationLog.username == username
        )
        .order_by(
            RecommendationLog.id.desc()
        )
        .first()
    )

    return {

        "username": user.name,          # <-- changed

        "email": user.email,

        "recommendations": recommendation_count,

        "lastSearch":
            latest_log.movies
            if latest_log
            else "No Searches Yet"

    }