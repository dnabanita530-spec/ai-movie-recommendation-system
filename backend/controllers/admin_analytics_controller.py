


from fastapi import APIRouter
import pandas as pd

from config.database import SessionLocal

from models.user_model import User
from models.favorite_model import Favorite
from models.history_model import WatchHistory
from models.review_model import Review
from models.rating_model import Rating
from models.recommendation_log_model import RecommendationLog

router = APIRouter(
    prefix="/admin/analytics",
    tags=["Admin Analytics"]
)

movies_df = pd.read_csv("data/enriched_movies.csv")


@router.get("/")
def get_dashboard():

    db = SessionLocal()

    try:

        total_movies = len(movies_df)

        total_users = db.query(User).count()

        total_ratings = db.query(Rating).count()

        total_reviews = db.query(Review).count()

        total_favorites = db.query(Favorite).count()

        total_history = db.query(WatchHistory).count()

        total_recommendations = (
            db.query(RecommendationLog).count()
        )

        active_users = (
            db.query(User)
            .filter(User.role == "USER")
            .count()
        )

        # -------------------------
        # Top Rated Movies
        # -------------------------

        rating_data = (
            db.query(Rating)
            .all()
        )

        movie_rating = {}

        for r in rating_data:

            if r.title not in movie_rating:

                movie_rating[r.title] = []

            movie_rating[r.title].append(r.rating)

        top_movies = []

        for title, values in movie_rating.items():

            avg = sum(values) / len(values)

            top_movies.append({

                "title": title,

                "rating": round(avg,2)

            })

        top_movies.sort(

            key=lambda x:x["rating"],

            reverse=True

        )

        top_movies = top_movies[:5]

        # -------------------------
        # Genre Distribution
        # -------------------------

        genres = {}

        for row in movies_df["genres"]:

            for g in row.split("|"):

                genres[g] = genres.get(g,0)+1

        # -------------------------
        # Recent Activities
        # -------------------------

        activities = []

        latest_reviews = (

            db.query(Review)

            .order_by(Review.id.desc())

            .limit(5)

            .all()

        )

        for review in latest_reviews:

            user = (

                db.query(User)

                .filter(User.id == review.user_id)

                .first()

            )

            name = user.name if user else "Unknown User"

            activities.append({
                "type":"Review",
                "message":f"{name} reviewed {review.title}"
    })

        latest_favorites = (

            db.query(Favorite)

            .order_by(Favorite.id.desc())

            .limit(5)

            .all()

        )

        for fav in latest_favorites:

            user = (

                db.query(User)

                .filter(User.id==fav.user_id)

                .first()

            )
            user=(
                db.query(User)
                .filter(User.id==fav.user_id)
                .first()
            )
            name= user.name if user else "Unknown User"
            activities.append({

                "type":"Favorite",

                "message":

                f"{name} added {fav.title}"
                
               
            })

        latest_history = (

            db.query(WatchHistory)

            .order_by(

                WatchHistory.id.desc()

            )

            .limit(5)

            .all()

        )

        for movie in latest_history:

            user = (

                db.query(User)

                .filter(User.id==movie.user_id)

                .first()

            )

            user=(
                db.query(User)
                .filter(User.id==movie.user_id)
                .first()
            )
            name= user.name if user else "Unknown User"
            activities.append({

                "type":"History",

                "message":

                f"{name} watched {movie.title}"

            })

        latest_logs = (

            db.query(RecommendationLog)

            .order_by(

                RecommendationLog.id.desc()

            )

            .limit(5)

            .all()

        )

        for log in latest_logs:

            activities.append({

                "type":"Recommendation",

                "message":

                f"Recommendation generated for {log.username}"

            })

        return {

            "totalMovies": total_movies,

            "totalUsers": total_users,

            "totalRatings": total_ratings,

            "totalReviews": total_reviews,

            "totalFavorites": total_favorites,

            "totalHistory": total_history,

            "totalRecommendations": total_recommendations,

            "activeUsers": active_users,

            "topMovies": top_movies,

            "genreDistribution": genres,

            "recentActivities": activities

        }

    finally:

        db.close()