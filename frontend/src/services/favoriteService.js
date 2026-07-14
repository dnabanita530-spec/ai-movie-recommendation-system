const API = "http://localhost:8000/favorites";

export async function getFavorites(username) {

    const res = await fetch(

        `${API}/${username}`

    );

    return res.json();

}

export async function addFavorite(movie) {

    return fetch(API + "/", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(movie)

    });

}

export async function removeFavorite(

    username,

    movieId

) {

    return fetch(

        `${API}/${username}/${movieId}`,

        {

            method: "DELETE"

        }

    );

}