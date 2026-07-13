import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

function Emotion() {

    const webcamRef = useRef(null);

    const [emotion, setEmotion] = useState("");
const [loading, setLoading] = useState(false);
const [cameraReady, setCameraReady] = useState(false);
const isDetecting = useRef(false);
const detectEmotion = async () => {

    if (!webcamRef.current) return;

   if (isDetecting.current) return;

const imageSrc = webcamRef.current.getScreenshot();

if (!imageSrc) return;

isDetecting.current = true;

try {

        setLoading(true);

        const blob = await fetch(imageSrc)
            .then(res => res.blob());

        const formData = new FormData();

        formData.append(
            "file",
            blob,
            "frame.jpg"
        );

        const response = await fetch(
            "http://127.0.0.1:8000/emotion/detect",
            {
                method: "POST",
                body: formData
            }
        );

      if (!response.ok) {
    throw new Error("Emotion API failed");
}

const data = await response.json();

        setEmotion(previous => {

            if (previous !== data.emotion) {

                return data.emotion;

            }

            return previous;

        });

    } catch (error) {

        console.log(error);

    } finally {

       setLoading(false);

isDetecting.current = false;

    }

};

   useEffect(() => {

    if (!cameraReady) return;

    console.log("Emotion page loaded");

    const interval = setInterval(() => {

        detectEmotion();

    }, 1500);

    return () => clearInterval(interval);

}, [cameraReady]);
const emojis = {

    happy: "😊",

    sad: "😢",

    angry: "😠",

    fear: "😨",

    surprise: "😲",

    neutral: "😐",

    disgust: "🤢"

};
    return (

        <div
            style={{
                textAlign: "center",
                color: "white"
            }}
        >

            <h1>
                😊 Live Emotion Detection
            </h1>

          <Webcam
    ref={webcamRef}
    audio={false}
    mirrored={true}
    screenshotFormat="image/jpeg"
    screenshotQuality={1}
    width={700}
    height={500}
    onUserMedia={() => setCameraReady(true)}
    videoConstraints={{
        width: 1280,
        height: 720,
        facingMode: "user"
    }}
/>
            {loading && (

    <h3
        style={{
            color: "#facc15"
        }}
    >
        🤖 AI is analyzing your facial expression...
    </h3>

)}

       <div
    style={{
        marginTop: 20,
        padding: 20,
        borderRadius: 15,
        background: "#1e293b",
        display: "inline-block",
        minWidth: "250px"
    }}
>

    <h2>

        {emojis[emotion] || "🙂"}

    </h2>

    <h3>

        {emotion ? emotion.toUpperCase() : "WAITING..."}

    </h3>

</div>

        </div>

    );

}

export default Emotion;