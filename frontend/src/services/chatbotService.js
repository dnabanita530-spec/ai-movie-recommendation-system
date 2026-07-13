// export const chatWithAI = async (message) => {

//     const response = await fetch(

//         "http://127.0.0.1:8000/chatbot/chat",

//         {

//             method: "POST",

//             headers: {

//                 "Content-Type": "application/json"

//             },

//             body: JSON.stringify({

//                 message

//             })

//         }

//     );

//     return await response.json();

// };
import axios from "axios";

const API = "http://127.0.0.1:8000";

export const chatWithAI = async (message) => {

    const response = await axios.post(

        `${API}/chatbot/chat`,

        {
            message
        }

    );

    return response.data;

};