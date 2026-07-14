import json
import os

CACHE_FILE = "cache/tmdb_cache.json"


def load_tmdb_cache():

    if os.path.exists(CACHE_FILE):

        with open(CACHE_FILE, "r", encoding="utf-8") as f:

            return json.load(f)

    return {}


def save_tmdb_cache(cache):

    os.makedirs("cache", exist_ok=True)

    with open(CACHE_FILE, "w", encoding="utf-8") as f:

        json.dump(cache, f, indent=4)