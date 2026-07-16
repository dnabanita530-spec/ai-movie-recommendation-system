from fastapi import APIRouter, Query
import pandas as pd




print("🔥 admin_movie_controller loaded")
router = APIRouter(
    prefix="/admin/movies",
    tags=["Admin Movies"]
)

movies = pd.read_csv("data/enriched_movies.csv")
print(movies.columns.tolist())
ratings = pd.read_csv("data/ratings.csv")

@router.get("/")
def get_movies(

    page: int = Query(1),

    limit: int = Query(50),

    search: str = ""

):

    filtered = movies

    if search:

        filtered = filtered[
            filtered["title"].str.contains(
                search,
                case=False,
                na=False
            )
        ]

    total = len(filtered)

    start = (page - 1) * limit
    end = start + limit

    filtered = filtered.iloc[start:end]

    result = []
    for _, row in filtered.iterrows():
        movie_ratings = ratings[
            ratings["movieId"] == row["movieId"]
        ]["rating"]
        avg_rating = (
            round(movie_ratings.mean(), 1)
            if not movie_ratings.empty
            else 0
        )

        result.append({
            "movieId": int(row["movieId"]),
            "title": row["title"],
            "genres": row["genres"],
            "rating": avg_rating,
        })

    return {

        "movies": result,

        "total": total,

        "page": page,

        "pages": (total + limit - 1) // limit

    }
@router.put("/{movie_id}")
def update_movie(movie_id: int, movie: dict):

    global movies

    index = movies[movies["movieId"] == movie_id].index

    if len(index) == 0:
        return {"success": False, "message": "Movie not found"}

    idx = index[0]

    movies.at[idx, "title"] = movie["title"]
    movies.at[idx, "genres"] = movie["genres"]

    movies.to_csv(
        "data/enriched_movies.csv",
        index=False
    )

    return {
        "success": True,
        "message": "Movie Updated Successfully"
    }
    
@router.delete("/{movie_id}")
def delete_movie(movie_id: int):

    global movies

    movies = movies[
        movies["movieId"] != movie_id
    ]

    movies.to_csv(
        "data/enriched_movies.csv",
        index=False
    )

    return {
        "success": True,
        "message": "Movie Deleted Successfully"
    }
    
for route in router.routes:
    print(route.path, route.methods)