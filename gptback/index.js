//openai
// express
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

const configuration = new Configuration({
  organization: "org-tZ4PHQU8zeNFFEG6WV6JpvH2",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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

app.listen(3001, () => console.log("listening on port 3001"));
