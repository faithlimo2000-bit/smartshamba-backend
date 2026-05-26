const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log("🚀 SERVER STARTING...");
console.log("API KEY FOUND:", !!process.env.OPENROUTER_KEY);

/*
===================================
 SMARTSHAMBA AI CHAT API
===================================
*/

app.post("/api/chat", async (req, res) => {

  try {

    const message = req.body.message;

    console.log("📩 USER MESSAGE:", message);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",

  headers: {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
},

  body: JSON.stringify({

  model: "openrouter/auto",
  temperature: 0.3,
  max_tokens: 500,

   messages: [

    { 

        role: "system",
        content: `
You are SmartShamba AI.

You are a smart Kenyan farming expert.

Help farmers with:
- maize farming
- fertilizers
- diseases
- livestock
- irrigation
- pest control
- profits
- weather
- market prices
Answer clearly
- Never repeat words
- Never think aloud
- Never explain your thinking process
- Give short practical answers
- Sound human and professional
- No random repetition

        `
      },

      {
        role: "user",
        content: message
      }
    ]
  })
});
const data = await response.json();

console.log("FULL RESPONSE:", data);

const reply =
  data.choices &&
  data.choices[0] &&
  data.choices[0].message &&
  data.choices[0].message.content
    ? data.choices[0].message.content
    : "AI could not answer right now.";

res.json({ reply });

  } catch (error) {

    console.log("❌ SERVER ERROR:");
    console.log(error);

    res.json({
      reply: "Server error occurred."
    });

  }

});

/*
===================================
 START SERVER
===================================
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
