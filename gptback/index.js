// imports
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

//env must be created and contain OPENAI_API_KEY= Your API key

// env variable
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  organization: "org-tZ4PHQU8zeNFFEG6WV6JpvH2",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// for davinci
app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    max_tokens: 100,
    temperature: 0,
  });

  //console.log(response.data.choices);
  if (response.data.choices) {
    res.json({
      message: response.data.choices[0].text,
    });
  }
});

// for gpt3
app.post("/gpt3", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `${message}` }],
    temperature: 0,
  });
  if (response.data.choices) {
    res.json({
      message: response.data.choices[0].message.content,
    });
  }
});

// local host port 3001
app.listen(3001, () => console.log("listening on port 3001"));
