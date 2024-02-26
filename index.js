const { GoogleGenerativeAI } = require("@google/generative-ai");
const OpenAi = require("openai");
const { dbRef } = require("./lib/firebase");

const app = require("express")();
require("dotenv").config();
const TwitterApi = require("twitter-api-v2").default;

const port = 8080;

app.listen(port, () => {
  console.log("Server is live", port);
});

const twitterClient = new TwitterApi({
  clientId: process.env.TWITTER_CLIENT_ID,
  clientSecret: process.env.TWITTER_CLIENT_SECRET,
});

const openai = new OpenAi({
  apiKey: process.env["OPENAI_API_KEY"],
});

const gemini = new GoogleGenerativeAI(process.env.GEMENI_API_KEY);

const callbackUrl = `https://www.socialbots.yoginderkumar.in/auth/twitter/callback`;

const collectionStateRef = dbRef.collection("TwitterBotSessions").doc("state");
const collectionTokensRef = dbRef
  .collection("TwitterBotSessions")
  .doc("tokens");

app.get("/", (req, res) => {
  res.status(200).send("Server is up and running");
});

app.get("/auth/twitter/signin", async (req, res) => {
  const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
    callbackUrl,
    {
      scope: ["tweet.read", "tweet.write", "users.read", "offline.access"],
    }
  );

  await collectionStateRef.set({ codeVerifier, state });
  res.redirect(url);
});

app.get("/auth/twitter/callback", async (req, res) => {
  const { state, code } = req.query;

  const querySnapshot = collectionStateRef.get();
  const { codeVerifier, state: storedState } = (await querySnapshot).data();
  if (state !== storedState) {
    return res.send(400).set("Stored tokens do not match!");
  }
  const { accessToken, refreshToken } = await twitterClient.loginWithOAuth2({
    code,
    codeVerifier,
    redirectUri: callbackUrl,
  });

  await collectionTokensRef.set({ accessToken, refreshToken });
  res.status(200).send("Working callback ${accessToken}");
});

const topics = [
  "ReactJs",
  "ReactNative",
  "Javascript",
  "Typescript",
  "Frontend Developer",
  "Software Engineer",
  "CSS",
  "HTML",
  "Indian Startups",
  "Tech Jobs",
  "Tech in 2024",
  "Tech Culture",
  "Bangalore",
  "C++",
  "MongoDb",
  "NodeJs",
  "NextJs",
  "Venture Capitalism",
  "Artificial Intelligence",
  "MacOS",
  "Tech Layoffs",
];

const types_of_humours = [
  "Satirical",
  "Insulting",
  "Self-Deprecating",
  "Dark",
  "Wordplay",
];

const wildcards = [
  "use a hashtag",
  "use multiple hashtags",
  "use a bunch of emojis",
  "try to inspire the audience",
];

const max_characters = 72;

app.get("/post/tweet", async (req, res) => {
  const querySnapshot = collectionTokensRef.get();
  const { refreshToken } = (await querySnapshot).data();
  const {
    client: refreshedClient,
    accessToken,
    refreshToken: refreshedToken,
  } = await twitterClient.refreshOAuth2Token(refreshToken);
  await collectionTokensRef.set({ accessToken, refreshToken: refreshedToken });
  const geminiModel = gemini.getGenerativeModel({
    model: "gemini-pro",
  });

  const topic = Math.floor(Math.random() * topics.length);
  const humourStyle = Math.floor(Math.random() * types_of_humours.length);

  const prompt = `write me a sarcastic and funny tweet on "${
    topics[topic]
  }", picking up on "${
    types_of_humours[humourStyle]
  }" Humour style, ${wildcards.join(",")}, under ${max_characters} characters`;
  const { choices } = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  console.log("chatCompletion: ", choices[0]?.message?.content);
  const tweetFromGemini = await geminiModel.generateContent(prompt);
  const tweetFromGpt = choices[0]?.message?.content || "";
  const tweet = tweetFromGpt?.length
    ? tweetFromGpt
    : tweetFromGemini.replace(/"/g, "");
  await refreshedClient.v2.tweet(tweet);
  res.status(200).send({ data: prompt, tweetInText: tweet });
});
