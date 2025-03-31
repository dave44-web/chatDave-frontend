import axios from 'axios';
import DOMPurify from 'dompurify'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

export const getGeminiResponse = async (chatHistory) => {

    try {

        const formattedMessages = chatHistory.map((msg) => ({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
        }));

        const response = await axios.post(API_URL, {
            contents: formattedMessages
        });

        const aiResponse = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond to that";
        
        let formattedText = aiResponse.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/(\r?\n){2,}/g, "<p>$1</p>");
        
        return `<p>${DOMPurify.sanitize(formattedText)}</p>`
    } catch (error) {
        console.error("Error fetching AI response:", error.response?.data || error.message);
        return "Sorry, I couldn't process that. Check your Internet Connection...";
    }
};