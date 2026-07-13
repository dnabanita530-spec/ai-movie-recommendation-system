import requests

TMDB_API_KEY = "a2e02779d65925a649c2e422a44819b6"

url = (
    f"https://api.themoviedb.org/3/search/movie"
    f"?api_key={TMDB_API_KEY}"
    f"&query=Toy Story"
)

response = requests.get(url)

print("Status:", response.status_code)
print(response.json())