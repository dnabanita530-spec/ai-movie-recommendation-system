
import requests


TMDB_API_KEY = "a2e02779d65925a649c2e422a44819b6"


def get_movie_details(title):

    try:

        url = (
            f"https://api.themoviedb.org/3/search/movie"
            f"?api_key={TMDB_API_KEY}"
            f"&query={title}"
        )

        response = requests.get(url)

        data = response.json()

        if data.get("results"):

            movie = data["results"][0]

            return {

                "title":
                movie.get("title"),

                "poster":
                (
                    f"https://image.tmdb.org/t/p/w500"
                    f"{movie.get('poster_path')}"
                )
                if movie.get("poster_path")
                else None,

                "rating":
                movie.get("vote_average"),

                "language":
                movie.get("original_language"),

                "overview":
                movie.get("overview"),

                "release_date":
                movie.get("release_date")

            }

    except Exception as e:

        print("TMDB Error:", e)

    return {}




# import requests

# TMDB_API_KEY = "a2e02779d65925a649c2e422a44819b6"

# def get_movie_details(title):

#     print("Searching:", title)

#     url = (
#         f"https://api.themoviedb.org/3/search/movie"
#         f"?api_key={TMDB_API_KEY}"
#         f"&query={title}"
#     )

#     response = requests.get(url)

#     print(response.status_code)
#     print(response.json())

#     data = response.json()

#     if data.get("results"):

#         movie = data["results"][0]

#         return {
#             "poster": f"https://image.tmdb.org/t/p/w500{movie.get('poster_path')}"
#             if movie.get("poster_path")
#             else None,
#             "rating": movie.get("vote_average"),
#             "language": movie.get("original_language"),
#             "overview": movie.get("overview"),
#             "release_date": movie.get("release_date")
#         }

#     return {}


# import requests
# import re

# TMDB_API_KEY = "a2e02779d65925a649c2e422a44819b6"


# def get_movie_details(title):

#     try:

#         clean_title = re.sub(
#             r"\(\d{4}\)",
#             "",
#             title
#         ).strip()

#         search_url = (
#             f"https://api.themoviedb.org/3/search/movie"
#             f"?api_key={TMDB_API_KEY}"
#             f"&query={clean_title}"
#         )

#         search = requests.get(
#             search_url,
#             timeout=10
#         ).json()

#         if not search.get("results"):

#             return {}

#         movie = search["results"][0]

#         movie_id = movie["id"]

#         details = requests.get(
#             f"https://api.themoviedb.org/3/movie/{movie_id}"
#             f"?api_key={TMDB_API_KEY}",
#             timeout=10
#         ).json()

#         credits = requests.get(
#             f"https://api.themoviedb.org/3/movie/{movie_id}/credits"
#             f"?api_key={TMDB_API_KEY}",
#             timeout=10
#         ).json()

#         providers = requests.get(
#             f"https://api.themoviedb.org/3/movie/{movie_id}/watch/providers"
#             f"?api_key={TMDB_API_KEY}",
#             timeout=10
#         ).json()

#         cast = ", ".join(
#             actor["name"]
#             for actor in credits.get("cast", [])[:5]
#         )

#         director = ""

#         for person in credits.get("crew", []):

#             if person["job"] == "Director":

#                 director = person["name"]

#                 break

#         platforms = []

#         if providers.get("results", {}).get("IN"):

#             flatrate = providers["results"]["IN"].get(
#                 "flatrate",
#                 []
#             )

#             platforms = [
#                 x["provider_name"]
#                 for x in flatrate
#             ]

#         return {

#             "title":
#             movie.get("title"),

#             "poster":
#             (
#                 "https://image.tmdb.org/t/p/w500"
#                 + movie["poster_path"]
#             )
#             if movie.get("poster_path")
#             else "",

#             "backdrop":
#             (
#                 "https://image.tmdb.org/t/p/original"
#                 + movie["backdrop_path"]
#             )
#             if movie.get("backdrop_path")
#             else "",

#             "rating":
#             movie.get("vote_average", 0),

#             "language":
#             movie.get("original_language", ""),

#             "overview":
#             movie.get("overview", ""),

#             "release_date":
#             movie.get("release_date", ""),

#             "runtime":
#             details.get("runtime", 0),

#             "cast":
#             cast,

#             "director":
#             director,

#             "platforms":
#             ", ".join(platforms)

#         }

#     except Exception as e:

#         print("TMDB Error:", e)

#         return {}