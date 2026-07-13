from fastapi import APIRouter, UploadFile, File
import os
import shutil
import random
import pandas as pd

from services.emotion_service import detect_emotion

router = APIRouter(
    prefix="/emotion",
    tags=["Emotion Detection"]
)

movies = pd.read_csv("data/movies.csv")

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

emotion_map = {

    "happy": [
        "Comedy",
        "Adventure",
        "Animation",
        "Family"
    ],

    "sad": [
        "Drama",
        "Romance",
        "Music"
    ],

    "angry": [
        "Action",
        "Crime",
        "Thriller"
    ],

    "fear": [
        "Horror",
        "Mystery",
        "Thriller"
    ],

    "surprise": [
        "Fantasy",
        "Adventure",
        "Sci-Fi"
    ],

    "neutral": [
        "Adventure",
        "Comedy",
        "Drama"
    ],

    "disgust": [
        "Crime",
        "Thriller"
    ]

}


@router.post("/detect")
async def detect_emotion_api(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    try:

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        emotion = detect_emotion(file_path)

        genres = emotion_map.get(
            emotion,
            ["Comedy"]
        )

        pattern = "|".join(genres)

        recommended = movies[
            movies["genres"].str.contains(
                pattern,
                case=False,
                na=False,
                regex=True
            )
        ]

        if len(recommended) > 15:
            recommended = recommended.sample(
                n=15,
                random_state=random.randint(1, 100000)
            )

        return {

            "emotion": emotion,

            "genres": genres,

            "movies": recommended.to_dict(
                orient="records"
            )

        }

    except Exception as e:

        return {
            "emotion": "neutral",
            "genres": ["Comedy"],
            "movies": [],
            "error": str(e)
        }

    finally:

        if os.path.exists(file_path):
            os.remove(file_path)