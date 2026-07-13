import { useEffect, useRef, useState } from "react";
import { chatWithAI } from "../../services/chatbotService";
import { getPoster } from "../../services/tmdbService";
import "./AIChat.css";
function AIChat() {

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const [reply, setReply] = useState("");

    const [emotion, setEmotion] = useState("");

    const [movies, setMovies] = useState([]);

    const [chatHistory, setChatHistory] = useState([]);
const chatEndRef = useRef(null);
const recognitionRef = useRef(null);

const startListening = () => {

    if (!("webkitSpeechRecognition" in window)) {

        alert("Speech Recognition is not supported in this browser.");

        return;
    }

    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {

        const speech = event.results[0][0].transcript;

        // setMessage(speech);
            setMessage(speech);

setTimeout(() => {

sendMessage();

},300);
    };

    recognition.onerror = (event) => {

        console.log(event.error);

    };

    recognition.start();

    recognitionRef.current = recognition;

};
    const sendMessage = async () => {

        if (!message.trim()) return;

        const userMessage = message;

        setChatHistory(prev => [

            ...prev,

            {
sender:"user",
text:userMessage,
time:new Date().toLocaleTimeString()
}

        ]);

        setMessage("");
        setMovies([]);

setEmotion("");

setReply("");

        try {

            setLoading(true);

            // const response = await fetch(

            //     "http://127.0.0.1:8000/chatbot/chat",

            //     {

            //         method: "POST",

            //         headers: {

            //             "Content-Type": "application/json"

            //         },

            //         body: JSON.stringify({

            //             message: userMessage

            //         })

            //     }

            // );

            // const data = await response.json();
const data = await chatWithAI(userMessage);
            setReply(data.reply);

            setEmotion(data.emotion);

            const moviesWithPoster = await Promise.all(

                (data.movies || []).map(

                    async movie => ({

                        ...movie,

                        poster:

(await getPoster(movie.title))

||

"https://dummyimage.com/300x450/222/ffffff&text=Movie"

                    })

                )

            );

            setMovies(moviesWithPoster);

            setChatHistory(prev => [

                ...prev,

               {
sender:"bot",
text:data.reply,
time:new Date().toLocaleTimeString()
}

            ]);

        }

       catch(err){

console.log(err);

setChatHistory(prev=>[

...prev,

{

sender:"bot",

text:"❌ Sorry! I couldn't connect to the AI server.",

time:new Date().toLocaleTimeString()

}

]);

}

        finally {

            setLoading(false);

        }

    };
useEffect(() => {

    chatEndRef.current?.scrollIntoView({

        behavior:"smooth"

    });

}, [chatHistory]);
    return (

        <div className="chatPage">

            <div className="chatContainer">
<div className="suggestions">

<button onClick={() => setMessage("I am feeling sad today")}>
😢 Sad
</button>

<button onClick={() => setMessage("I am very happy")}>
😊 Happy
</button>

<button onClick={() => setMessage("I am stressed")}>
😔 Stressed
</button>

<button onClick={() => setMessage("Recommend horror movies")}>
👻 Horror
</button>

<button onClick={() => setMessage("Recommend romantic movies")}>
❤️ Romance
</button>

<button onClick={() => setMessage("Make me laugh")}>
😂 Comedy
</button>

</div>
                <h1>

                    🤖 CineBot AI Assistant

                </h1>

                <div className="chatBox">
{chatHistory.length===0 && (

<div className="welcome">

<h2>

👋 Welcome to CineBot

</h2>

<p>

😊 Tell me how you feel and CineBot will recommend movies just for you.

</p>

<br/>

<p>

Examples:

</p>

<ul>

<li>😊 I am happy</li>

<li>😢 I feel sad</li>

<li>❤️ Recommend romantic movies</li>

<li>👻 Horror movies</li>

<li>😂 Make me laugh</li>

</ul>

</div>

)}
                    {chatHistory.map((chat, index) => (

                        <div

                            key={index}

                            className={

                                chat.sender === "user"

                                    ? "userMessage"

                                    : "botMessage"

                            }

                        >

                           <div className="messageContent">
    <div>
        {chat.sender === "user" ? "👤 " : "🤖 "}
        {chat.text}
    </div>

    <small className="chatTime">
        {chat.time}
    </small>
</div>

                        </div>

                    ))}

                    {loading && (

                        <div className="botMessage">

🤖 CineBot is Thinking...

<div className="typing">

<span></span>

<span></span>

<span></span>

</div>

</div>

                    )}
<div ref={chatEndRef}></div>
                </div>

                <div className="inputArea">

                    <input
type="text"
placeholder="How are you feeling today?"
value={message}
onChange={(e)=>setMessage(e.target.value)}
onKeyDown={(e)=>{

if(e.key==="Enter"){

sendMessage();

}

}}
/>

<button
className="micBtn"
onClick={startListening}
title="Speak"
>

🎤

</button>

{/* <button
onClick={sendMessage}
>

Send

</button> */}

                    <button

                        onClick={sendMessage}

                    >

                        Send

                    </button>

                </div>

                {emotion && (

                <div className="emotionBox">

<h2>

🧠 AI Emotion Analysis

</h2>

<h1>

{emotion.toUpperCase()}

</h1>

</div>

                )}

                {movies.length > 0 && (

                    <>

                        <h2>

                            🎬 Recommended Movies

                        </h2>

                        <div className="movieGrid">

                            {movies.map(movie => (

                                <div

                                    key={movie.movieId}

                                    className="movieCard"

                                >

                                    <img

                                        src={

                                            movie.poster ||

                                            "https://dummyimage.com/300x450/222/ffffff&text=Movie"

                                        }

                                        alt={movie.title}

                                    />

                                    <h3>

                                        {movie.title}

                                    </h3>

                                    <p>{movie.genres}</p>

<button
className="watchBtn"
onClick={() =>
window.open(
`https://www.youtube.com/results?search_query=${movie.title}+official+trailer`,
"_blank"
)
}
>

▶ Watch Trailer

</button>

                                </div>

                            ))}

                        </div>

                    </>

                )}

            </div>

        </div>

    );

}

export default AIChat;