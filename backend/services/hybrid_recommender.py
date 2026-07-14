import pandas as pd
import joblib

# ==========================================================
# LOAD DATASET
# ==========================================================

movies = pd.read_csv("data/movies.csv")

movies["title"] = movies["title"].fillna("")
movies["genres"] = movies["genres"].fillna("")

# ==========================================================
# LOAD PRE-TRAINED MODELS
# ==========================================================

tfidf = joblib.load("models/tfidf.pkl")

tfidf_matrix = joblib.load("models/tfidf_matrix.pkl")

cosine_sim = joblib.load("models/cosine_sim.pkl")

indices = joblib.load("models/indices.pkl")

svd = joblib.load("models/svd.pkl")

# ==========================================================
# CONTENT RECOMMENDER
# ==========================================================

def content_recommend(movie_title, n=100):

    if movie_title not in indices:
        return pd.DataFrame()

    idx = indices[movie_title]

    similarity_scores = list(
        enumerate(cosine_sim[idx])
    )

    similarity_scores = sorted(
        similarity_scores,
        key=lambda x: x[1],
        reverse=True
    )

    similarity_scores = similarity_scores[1:n + 1]

    movie_indices = [
        index
        for index, score in similarity_scores
    ]

    return movies.iloc[movie_indices].copy()


# ==========================================================
# COLLABORATIVE SCORE
# ==========================================================

def collaborative_score(user_id, movie_id):

    return svd.predict(
        user_id,
        movie_id
    ).est


# ==========================================================
# HYBRID RECOMMENDER
# ==========================================================

def hybrid_recommend(
    movie_title,
    user_id=1,
    n=20
):

    candidates = content_recommend(
        movie_title,
        n=100
    )

    if candidates.empty:
        return pd.DataFrame()

    movie_index = indices[movie_title]

    candidates["content_score"] = candidates.index.map(
        lambda idx: cosine_sim[movie_index][idx]
    )

    candidates["collaborative_score"] = candidates["movieId"].apply(
        lambda movie_id:
        collaborative_score(
            user_id,
            movie_id
        )
    )

    candidates["hybrid_score"] = (

        0.7 * candidates["collaborative_score"]

        +

        0.3 * candidates["content_score"]

    )

    candidates = candidates.sort_values(
        by="hybrid_score",
        ascending=False
    )

    candidates = candidates.drop_duplicates(
        subset="movieId"
    )

    return candidates.head(n)