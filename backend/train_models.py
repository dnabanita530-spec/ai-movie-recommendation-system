import pandas as pd
import joblib

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from surprise import Dataset
from surprise import Reader
from surprise import SVD

print("Loading datasets...")

movies = pd.read_csv("data/movies.csv")
ratings = pd.read_csv("data/ratings.csv")

movies["features"] = (
    movies["title"].fillna("")
    + " "
    + movies["genres"].fillna("")
)

print("Training TF-IDF...")

tfidf = TfidfVectorizer(
    stop_words="english"
)

tfidf_matrix = tfidf.fit_transform(
    movies["features"]
)

cosine_sim = cosine_similarity(
    tfidf_matrix
)

indices = pd.Series(
    movies.index,
    index=movies["title"]
).drop_duplicates()

print("Training SVD...")

reader = Reader(
    rating_scale=(0.5,5)
)

dataset = Dataset.load_from_df(

    ratings[
        ["userId","movieId","rating"]
    ],

    reader

)

trainset = dataset.build_full_trainset()

svd = SVD(random_state=42)

svd.fit(trainset)

print("Saving models...")

joblib.dump(
    tfidf,
    "models/tfidf.pkl"
)

joblib.dump(
    tfidf_matrix,
    "models/tfidf_matrix.pkl"
)

joblib.dump(
    cosine_sim,
    "models/cosine_sim.pkl"
)

joblib.dump(
    indices,
    "models/indices.pkl"
)

joblib.dump(
    svd,
    "models/svd.pkl"
)

print("Done!")