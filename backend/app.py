from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.database import Base, engine

from routes.auth_routes import router as auth_router

from controllers.movie_controller import router as movie_router
from controllers.trending_controller import router as trending_router
from controllers.top_rated_controller import router as top_rated_router
from controllers.recommendation_controller import router as recommendation_router
from controllers.hybrid_controller import router as hybrid_router

from controllers.admin_controller import router as admin_router
from controllers.admin_user_controller import router as admin_user_router
from controllers.admin_review_controller import router as admin_review_router
from controllers.admin_analytics_controller import router as analytics_router
from controllers.admin_recommendation_controller import router as admin_recommendation_router
from controllers.recommendation_performance_controller import router as performance_router
from controllers.profile_controller import router as profile_router
from controllers.emotion_controller import (
    router as emotion_router
)

from controllers.chatbot_controller import (
    router as chatbot_router
)
from controllers.favorite_controller import router as favorite_router

from controllers.history_controller import router as history_router
from controllers.review_controller import router as review_router
from controllers.rating_controller import router as rating_router
# ======================================
# Create FastAPI App
# ======================================

app = FastAPI(
    title="Movie Recommendation API"
)

# ======================================
# CORS
# ======================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======================================
# Create Database Tables
# ======================================

Base.metadata.create_all(bind=engine)

# ======================================
# Register Routers
# ======================================

app.include_router(auth_router)

app.include_router(movie_router)

app.include_router(trending_router)

app.include_router(top_rated_router)

app.include_router(recommendation_router)

app.include_router(hybrid_router)

app.include_router(admin_router)

app.include_router(admin_user_router)

app.include_router(admin_review_router)

app.include_router(analytics_router)

app.include_router(admin_recommendation_router)

app.include_router(performance_router)

app.include_router(profile_router)
app.include_router(
    emotion_router
)
app.include_router(chatbot_router)
app.include_router(favorite_router)
app.include_router(history_router)
app.include_router(review_router)
app.include_router(rating_router)
# ======================================
# Home API
# ======================================

@app.get("/")
def home():
    return {
        "message": "Movie Recommendation Backend Running"
    }