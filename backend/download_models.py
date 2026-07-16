import os
import requests

os.makedirs("models", exist_ok=True)

FILES = {
    "cosine_sim.pkl": "https://www.dropbox.com/scl/fi/gdw2k8eijuy2zg9bviloo/cosine_sim.pkl?rlkey=42us958sho8jyymnjw3jbmnzw&st=7ub130cv&dl=1",
    "svd.pkl": "https://www.dropbox.com/scl/fi/i7ptfj0zce14lvmcat5e8/svd.pkl?rlkey=odd9yxcneg5j7ff1oy7mvhp6q&st=jjjfjzfu&dl=1",
    "indices.pkl": "https://www.dropbox.com/scl/fi/6e2h01ria65uhjp22ha0o/indices.pkl?rlkey=d5iatcgprpfaibpxen4uecojc&st=l3pislaj&dl=1",
    "tfidf.pkl": "https://www.dropbox.com/scl/fi/2y2iflhw0gwu646jfvjxq/tfidf.pkl?rlkey=rqiy2i57z1d0fm0w1gjbdnr0s&st=z820d8tl&dl=1",
    "tfidf_matrix.pkl": "https://www.dropbox.com/scl/fi/1dknw4gm6mzm9nd42ds9l/tfidf_matrix.pkl?rlkey=pxnlhlwfrly0269gnpix6uxwl&st=qojaajn5&dl=1",
}

for filename, url in FILES.items():
    path = os.path.join("models", filename)

    if os.path.exists(path):
        print(f"{filename} already exists.")
        continue

    print(f"Downloading {filename}...")

    response = requests.get(url, allow_redirects=True)
    response.raise_for_status()

    with open(path, "wb") as f:
        f.write(response.content)

    print(f"Downloaded {filename} ({os.path.getsize(path)} bytes)")

print("All models downloaded.")