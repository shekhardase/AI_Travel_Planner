export async function generateTripPlan(prompt) {
    const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
    const MODEL_ID = 'gemini 2.0 flash';
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${GEMINI_API_KEY}`;

    const requestBody = {
        contents: [
            {
                role: "user",
                parts: [{ text: prompt }]
            }
        ]
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
}