const API = "http://localhost:8000/history";

export async function getHistory(username) {

    const res = await fetch(

        `${API}/${username}`

    );

    return res.json();

}

export async function addHistory(movie) {

    return fetch(API + "/", {

        method: "POST",

        headers: {

            "Content-Type":"application/json"

        },

        body: JSON.stringify(movie)

    });

}

export async function removeHistory(

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