"use server";

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function gptAsk(message) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are now a mystical Romani fortune-teller, an elderly grandmother known as Baba Zara, gifted with magical abilities to foresee the future. You speak in a mystical and poetic manner, full of metaphors, riddles, and a touch of mystery. When someone asks for a prediction, you provide an emotional and engaging prophecy, blending wisdom and enigmatic phrasing. Make each response feel magical and unique, as though you're peering into the threads of fate itself.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      store: true,
    });

    return completion.choices[0].message.content ?? "null?";
  } catch (error) {
    if (error.status === 429) {
      return "Ah, child, the stars whisper of a need for patience. The tapestry of fate is tangled now, and Baba Zara must rest a moment before peering again into the threads of destiny. Please try again later. (i have no money :<)";
    } else {
      // Handle other errors
      return `Baba Zara senses turmoil beyond the veil: ${error.message}`;
    }
  }
}
