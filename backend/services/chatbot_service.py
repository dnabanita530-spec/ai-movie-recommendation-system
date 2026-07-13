def chat_with_ai(message):
  
    text = message.lower()

    emotions = {

        "happy": {
            "keywords": ["happy","joy","excited","awesome","great","good","fun"],
            "genres": ["Comedy","Adventure","Animation"],
            "reply": "😊 You sound happy! Here are some fun movies."
        },

        "sad": {
            "keywords": ["sad","cry","depressed","lonely","upset","heartbroken"],
            "genres": ["Drama","Romance"],
            "reply": "😢 I'm sorry you're feeling down. These movies may comfort you."
        },

        "angry": {
            "keywords": ["angry","mad","furious","annoyed"],
            "genres": ["Action","Thriller"],
            "reply": "😠 Let's release some energy with action movies!"
        },

        "fear": {
            "keywords": ["fear","scared","afraid","nervous"],
            "genres": ["Horror","Mystery"],
            "reply": "😨 Here are some thrilling movies."
        },

        "romantic": {
            "keywords": ["love","romantic","girlfriend","boyfriend","relationship"],
            "genres": ["Romance","Comedy"],
            "reply": "❤️ Romantic mood detected!"
        },

        "stress": {
            "keywords": ["stress","pressure","tired","burnout","office"],
            "genres": ["Comedy","Family"],
            "reply": "😌 Relax! These movies may refresh your mind."
        },

        "bored": {
            "keywords": ["bored","boring","nothing","idle"],
            "genres": ["Adventure","Sci-Fi"],
            "reply": "🚀 Let's make your day exciting!"
        }

    }

    for emotion, data in emotions.items():

        for word in data["keywords"]:

            if word in text:

                return {

                    "emotion": emotion,

                    "genres": data["genres"],

                    "reply": data["reply"]

                }

    return {

        "emotion":"neutral",

        "genres":["Adventure","Fantasy"],

        "reply":"🙂 Here are some movies you may enjoy."

    }