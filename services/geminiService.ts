
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  async generateCaption(imageDataBase64: string): Promise<string> {
    // Always initialize GoogleGenAI with a named parameter using the process.env.API_KEY directly.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: imageDataBase64.split(',')[1] || imageDataBase64,
              },
            },
            { text: "Write a short, engaging Instagram-style caption for this image. Include 2-3 relevant hashtags." }
          ]
        },
        config: {
          temperature: 0.7,
        }
      });

      // Directly access .text property from the response object as per guidelines.
      return response.text || "Just another day in paradise! ✨ #blessed #vibes";
    } catch (error) {
      console.error("Gemini Caption Generation Error:", error);
      return "Something went wrong generating the caption. 📸";
    }
  }

  async suggestComment(postCaption: string): Promise<string> {
    // Always initialize GoogleGenAI with a named parameter using the process.env.API_KEY directly.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Given this caption: "${postCaption}", suggest a short, friendly 1-sentence comment.`,
      });
      // Directly access .text property from the response object as per guidelines.
      return response.text || "Love this! ❤️";
    } catch (error) {
      console.error("Gemini Suggest Comment Error:", error);
      return "Wow! 👏";
    }
  }
}

export const geminiService = new GeminiService();
