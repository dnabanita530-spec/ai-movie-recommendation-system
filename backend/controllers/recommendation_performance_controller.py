from fastapi import APIRouter
from sqlalchemy.orm import Session

from config.database import SessionLocal

from models.recommendation_log_model import (
    RecommendationLog
)

router = APIRouter(
    prefix="/admin/performance",
    tags=["Recommendation Performance"]
)


@router.get("/")
def get_performance():

    db = SessionLocal()
    try:

        logs = db.query(
            RecommendationLog
        ).all()

        total_recommendations = len(logs)

        user_count = {}

        movie_count = {}

        hybrid_count = 0

        for log in logs:

        # Most Active User
            user_count[log.username] = (
                user_count.get(
                    log.username,
                    0
                ) + 1
            )

        # Recommendation Type Count
            if (
                log.recommendation_type
                == "Hybrid"
            ):
                hybrid_count += 1

        # Most Recommended Movie
            movies = (
                log.movies.split(",")
            )

            for movie in movies:

                movie = movie.strip()

                movie_count[movie] = (
                    movie_count.get(
                        movie,
                        0
                    ) + 1
                )

        most_active_user = (

            max(
                user_count,
                key=user_count.get
            )

            if user_count

            else "N/A"
        )

        most_recommended_movie = (

            max(
                movie_count,
                key=movie_count.get
            )

            if movie_count

            else "N/A"
        )

        return {

            "totalRecommendations":
            total_recommendations,

            "hybridRecommendations":
            hybrid_count,

            "mostActiveUser":
            most_active_user,

            "mostRecommendedMovie":
            most_recommended_movie

        }
    finally:

        db.close()