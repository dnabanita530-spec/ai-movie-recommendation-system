from fastapi import APIRouter
from config.database import SessionLocal

from models.user_model import User
from models.favorite_model import Favorite
from models.history_model import WatchHistory
from models.rating_model import Rating
from models.review_model import Review
from models.recommendation_log_model import RecommendationLog

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


@router.get("/{username}")
def get_profile(username: str):

    db = SessionLocal()
    try:

        user = (
            db.query(User)
            .filter(User.name == username)
            .first()
        )

        if not user:

            return {
                "username": username,
                "email": "",
                "history": 0,
                "favorites": 0,
                "reviews": 0,
                "recommendations": 0,
                "lastSearch": "No Searches Yet",
                "moviePersonality": "Movie Explorer",
                "favoriteGenre": "N/A",
                "recentHistory": [],
                "recentRatings": []
            }

    # Recommendation Count

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

    # Favorites

        favorite_count = (
            db.query(Favorite)
            .filter(
                Favorite.user_id == user.id
            )
            .count()
        )

    # Watch History

        history = (
            db.query(WatchHistory)
            .filter(
                WatchHistory.user_id == user.id
            )
            .order_by(
                WatchHistory.watched_at.desc()
            )
            .all()
        )

    # Reviews

        reviews = (
            db.query(Review)
            .filter(
                Review.user_id == user.id
            )
            .all()
        )

    # Ratings

        ratings = (
            db.query(Rating)
            .filter(
                Rating.user_id == user.id
            )
            .order_by(
                Rating.id.desc()
            )
            .all()
        )

    # Recent History

        recent_history = []

        for h in history[:6]:

            recent_history.append({

                "movieId": h.movie_id,

                "title": h.title,

                "poster": h.poster

            })

    # Recent Ratings

        recent_ratings = []

        for r in ratings[:5]:

            recent_ratings.append({

                "movieId": r.movie_id,

                "title": r.title,

                "rating": r.rating

            })

        return {

            "username": user.name,

            "email": user.email,

            "history": len(history),

            "favorites": favorite_count,

            "reviews": len(reviews),

            "recommendations": recommendation_count,

            "lastSearch":
                latest_log.movies
                if latest_log
                else "No Searches Yet",

            "moviePersonality": "Movie Explorer",

            "favoriteGenre": "Action",

            "recentHistory": recent_history,

            "recentRatings": recent_ratings

        }
    finally:
        db.close()