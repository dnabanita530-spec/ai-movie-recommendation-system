

from fastapi import APIRouter
from sqlalchemy.orm import Session
from collections import Counter

from config.database import SessionLocal
from models.recommendation_log_model import RecommendationLog

router = APIRouter(
    prefix="/admin/recommendations",
    tags=["Admin Recommendations"]
)


@router.get("/")
def get_recommendations():

    db: Session = SessionLocal()

    try:

        logs = (
            db.query(RecommendationLog)
            .order_by(RecommendationLog.created_at.desc())
            .all()
        )

        users = set()

        hybrid_count = 0
        content_count = 0

        movie_counter = Counter()

        recommendation_logs = []

        activities = []

        for log in logs:

            users.add(log.username)

            if log.recommendation_type.lower() == "hybrid":
                hybrid_count += 1
            else:
                content_count += 1

            movie_list = []

            if log.movies:
                movie_list = [
                    m.strip()
                    for m in log.movies.split(",")
                    if m.strip()
                ]

            if movie_list:
                movie_counter[movie_list[0]] += 1

            recommendation_logs.append({

                "user": log.username,

                "type": log.recommendation_type,

                "movies": movie_list,

                "date": log.created_at.strftime("%d-%m-%Y %H:%M"),

                "status": "Success"

            })

            activities.append(
                f"{log.username} generated {log.recommendation_type} recommendation"
            )

        top_movies = []

        for title, count in movie_counter.most_common(5):

            top_movies.append({

                "title": title,

                "count": count

            })

        return {

            "totalRecommendations": len(logs),

            "totalUsers": len(users),

            "hybridCount": hybrid_count,

            "contentCount": content_count,

            "logs": recommendation_logs,

            "topMovies": top_movies,

            "activities": activities[:10]

        }

    finally:

        db.close()