from fastapi import APIRouter
from pydantic import BaseModel
import pandas as pd

from services.chatbot_service import chat_with_ai

router = APIRouter(
    prefix="/chatbot",
    tags=["AI Chatbot"]
)

movies = pd.read_csv("data/movies.csv")


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(request: ChatRequest):

    ai = chat_with_ai(request.message)

    genres = ai["genres"]

    recommended = movies[
        movies["genres"].str.contains(
            "|".join(genres),
            case=False,
            na=False
        )
    ].head(12)

    return {
        "reply": ai["reply"],
        "emotion": ai["emotion"],
        "genres": genres,
        "movies": recommended.to_dict(
            orient="records"
        )
    }