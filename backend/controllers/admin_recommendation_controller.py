from fastapi import APIRouter

router = APIRouter(
    prefix="/admin/recommendations",
    tags=["Admin Recommendations"]
)

recommendations = [

    {
        "user": "Nabanita",
        "type": "Hybrid",
        "movies": [
            "Inception",
            "Interstellar",
            "The Dark Knight"
        ]
    },

    {
        "user": "Mita Das",
        "type": "Content Based",
        "movies": [
            "Toy Story",
            "Jumanji",
            "Heat"
        ]
    }

]

@router.get("/")
def get_recommendations():

    return recommendations