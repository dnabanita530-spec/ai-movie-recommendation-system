const API = "http://localhost:8000/ratings";

export async function getRatings(username) {

    const res = await fetch(

        `${API}/${username}`

    );

    return res.json();

}

export async function addRating(rating) {

    return fetch(API + "/", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(rating)

    });

}

export async function removeRating(

    username,

    movieId

){

    return fetch(

        `${API}/${username}/${movieId}`,

        {

            method:"DELETE"

        }

    );

}