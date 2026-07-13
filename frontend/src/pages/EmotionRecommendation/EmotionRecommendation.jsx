import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { getPoster } from "../../services/tmdbService";
import "./EmotionRecommendation.css";

function EmotionRecommendation() {

    const webcamRef = useRef(null);

    const isDetecting = useRef(false);

    const [cameraReady, setCameraReady] = useState(false);

    const [loading, setLoading] = useState(false);
const [capturedImage, setCapturedImage] = useState(null);

const [countdown, setCountdown] = useState(3);

const [finished, setFinished] = useState(false);

const [flash, setFlash] = useState(false);
const [detectStarted, setDetectStarted] = useState(false);
    const [emotion, setEmotion] = useState("");

    const [movies, setMovies] = useState([]);

    const emoji = {

        happy: "😊",

        sad: "😢",

        angry: "😠",

        fear: "😨",

        surprise: "😲",

        neutral: "😐",

        disgust: "🤢"

    };
const startCountdown = () => {

    setDetectStarted(true);

    let count = 3;

    setCountdown(3);

    const timer = setInterval(() => {

        count--;

        setCountdown(count);

        if (count <= 0) {

            clearInterval(timer);

            detectEmotion();

        }

    }, 1000);

};
    const detectEmotion = async () => {

        if (!cameraReady) return;

        if (!webcamRef.current) return;

        if (isDetecting.current) return;

        isDetecting.current = true;

        try {

            setLoading(true);

           const imageSrc = webcamRef.current.getScreenshot();

if (!imageSrc) return;

// Camera flash
setFlash(true);

setTimeout(() => {

    setFlash(false);

}, 200);

// Wait for flash before freezing image
await new Promise(resolve => setTimeout(resolve, 250));

setCapturedImage(imageSrc);

            const blob =
                await fetch(imageSrc)
                    .then(res => res.blob());

            const formData = new FormData();

            formData.append(
                "file",
                blob,
                "emotion.jpg"
            );

            const response =
                await fetch(
                    "http://127.0.0.1:8000/emotion/detect",
                    {
                        method: "POST",
                        body: formData
                    }
                );

            if (!response.ok)
                throw new Error("Detection Failed");

            const data =
                await response.json();
console.log("Data is:", data);
console.log("Backend Response:", data);

setEmotion(data.emotion);

console.log("Movies received:", data.movies);

setMovies(data.movies || []);

console.log("Movies state updated");
            setEmotion(data.emotion);

            const moviesWithPoster =
                await Promise.all(

                    (data.movies || []).map(

                        async movie => ({

                            ...movie,

                            poster: await getPoster(
                                movie.title
                            )

                        })

                    )

                );

            setMovies(moviesWithPoster);
            // setMovies(data.movies || []);
            setFinished(true);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

            isDetecting.current = false;

        }

    };

  useEffect(() => {

    if (cameraReady && !detectStarted) {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        startCountdown();

    }

}, [cameraReady, detectStarted]);

    return (

        <div className="emotionPage">
            {flash && (

    <div className="cameraFlash"></div>

)}

            <h1>

                🤖 AI Emotion Movie Recommendation

            </h1>

<div className="cameraContainer">

    {!capturedImage && countdown > 0 && (

        <div className="countdownOverlay">

            {countdown}

        </div>

    )}

    {capturedImage ? (

        <img
            src={capturedImage}
            alt="Captured"
            className="capturedImage"
        />

    ) : (

        <Webcam
            ref={webcamRef}
            audio={false}
            mirrored={true}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            width={650}
            height={500}
            onUserMedia={() => setCameraReady(true)}
            videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: "user"
            }}
        />

    )}

</div>

            {loading &&

                <h3>

                    🔍 Detecting Emotion...

                </h3>

            }

            <div className="emotionCard">

                <h1>

                    {emoji[emotion] || "🙂"}

                </h1>

                <h2>

                    {emotion
                        ? emotion.toUpperCase()
                        : "WAITING..."}

                </h2>

            </div>

            <h2>

                Recommended Movies

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

                            className="moviePoster"

                        />

                        <h3>

                            {movie.title}

                        </h3>

                        <p>

                            {movie.genres}

                        </p>

                    </div>

                ))}

            </div>
            {finished && (

<button
className="againBtn"
onClick={() => {

    setCapturedImage(null);

    setMovies([]);

    setEmotion("");

    setFinished(false);

    setDetectStarted(false);

}}
>

🔄 Detect Again

</button>

)}

        </div>

    );

}

export default EmotionRecommendation;