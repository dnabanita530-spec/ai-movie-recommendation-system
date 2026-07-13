from fastapi import APIRouter

router = APIRouter(
    prefix="/admin/reviews",
    tags=["Admin Reviews"]
)

reviews = [

    {
        "user": "Mita Das",
        "movie": "Toy Story (1995)",
        "rating": 5,
        "review": "Excellent movie"
    },

    {
        "user": "Nabanita",
        "movie": "Inception",
        "rating": 4,
        "review": "Mind blowing movie"
    }

]

@router.get("/")
def get_reviews():

    return reviews
  

@router.delete("/{index}")
def delete_review(index: int):

    reviews.pop(index)

    return {
        "success": True
    }