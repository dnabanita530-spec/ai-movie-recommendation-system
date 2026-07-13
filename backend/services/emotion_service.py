from deepface import DeepFace


def detect_emotion(image_path: str):

    try:

        result = DeepFace.analyze(

            img_path=image_path,

            actions=["emotion"],

            detector_backend="retinaface",

            align=True,

            enforce_detection=True,

            silent=True

        )

        if isinstance(result, list):
            result = result[0]

        print("\n========== Emotion Scores ==========")
        print(result["emotion"])
        print("Dominant Emotion:", result["dominant_emotion"])
        print("====================================\n")

        return result["dominant_emotion"]

    except Exception as e:

        print("Emotion Detection Error:", e)

        return "neutral"