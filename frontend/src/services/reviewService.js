const API = "http://localhost:8000/reviews";

export async function getReviews(username) {

    const res = await fetch(

        `${API}/${username}`

    );

    return res.json();

}

export async function addReview(review) {

    return fetch(API + "/", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(review)

    });

}

export async function removeReview(

    username,

    movieId

){

    return fetch(

        `${API}/${username}/${movieId}`,

        {

            method: "DELETE"

        }

    );

}