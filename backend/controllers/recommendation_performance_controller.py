
from fastapi import APIRouter
from sqlalchemy.orm import Session

from config.database import SessionLocal
from models.recommendation_log_model import RecommendationLog

router = APIRouter(
    prefix="/recommendation-performance",
    tags=["Recommendation Performance"]
)


@router.get("/")
def recommendation_performance():

    db: Session = SessionLocal()

    try:

        logs = (
            db.query(RecommendationLog)
            .order_by(RecommendationLog.created_at.desc())
            .all()
        )

        total = len(logs)

        hybrid = len(
            [
                x for x in logs
                if x.recommendation_type == "Hybrid"
            ]
        )

        content = len(
            [
                x for x in logs
                if x.recommendation_type == "Content"
            ]
        )

        # -------------------------
        # User Count
        # -------------------------

        user_count = {}

        for log in logs:

            user_count[log.username] = (
                user_count.get(log.username, 0) + 1
            )

        active_users = len(user_count)

        average = round(
            total / active_users,
            2
        ) if active_users else 0

        most_active = (
            max(
                user_count,
                key=user_count.get
            )
            if user_count else "-"
        )

        # -------------------------
        # Movie Count
        # -------------------------

        movie_count = {}

        for log in logs:

            for movie in log.movies.split(","):

                movie = movie.strip()

                movie_count[movie] = (
                    movie_count.get(movie, 0) + 1
                )

        most_movie = (
            max(
                movie_count,
                key=movie_count.get
            )
            if movie_count else "-"
        )

        top_users = [

            {
                "user": k,
                "count": v
            }

            for k, v in sorted(

                user_count.items(),

                key=lambda x: x[1],

                reverse=True

            )[:5]

        ]

        history = []

        for log in logs[:15]:

            history.append({

                "user": log.username,

                "type": log.recommendation_type,

                "movies": log.movies,

                "date": str(log.created_at)

            })

        return {

            "totalRecommendations": total,

            "hybridCount": hybrid,

            "contentCount": content,

            "activeUsers": active_users,

            "averagePerUser": average,

            "mostActiveUser": most_active,

            "mostRecommendedMovie": most_movie,

            "lastRecommendation":
            str(logs[0].created_at)
            if logs else "-",

            "topUsers": top_users,

            "history": history

        }

    finally:

        db.close()