import pandas as pd
import numpy as np

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


movies = pd.read_csv("data/movies.csv")
ratings = pd.read_csv("data/ratings.csv")
tags = pd.read_csv("data/tags.csv")

movies["genres"] = movies["genres"].fillna("")

tags_grouped = (
    tags.groupby("movieId")["tag"]
    .apply(lambda x: " ".join(x))
    .reset_index()
)

movies = movies.merge(
    tags_grouped,
    on="movieId",
    how="left"
)

movies["tag"] = movies["tag"].fillna("")

movies["features"] = (
    movies["genres"] + " " + movies["tag"]
)


tfidf = TfidfVectorizer(stop_words="english")

tfidf_matrix = tfidf.fit_transform(
    movies["features"]
)

cosine_sim = cosine_similarity(
    tfidf_matrix,
    tfidf_matrix
)


def content_recommend(movie_title, n=10):
  
    movie = movies[
        movies["title"] == movie_title
    ]

    if movie.empty:
        return []

    idx = movie.index[0]

    scores = list(
        enumerate(cosine_sim[idx])
    )

    scores = sorted(
        scores,
        key=lambda x: x[1],
        reverse=True
    )

    scores = scores[1:n+1]

    return [
        movies.iloc[i]["title"]
        for i, score in scores
    ]