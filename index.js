const { GoogleGenerativeAI } = require("@google/generative-ai");
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

const prompts = [
  "ReactJs",
  "ReactNative",
  "Javascript",
  "Typescript",
  "Frontend Developer",
  "Software Engineer",
  "CSS",
  "HTML",
  "Bill Gates",
  "Steve Jobs",
  "Kunal Shah",
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
  "Cryptography",
  "Bitcoin",
  "iOS",
  "Android",
];

const wildcards = [
  "use a hashtag",
  "use multiple hashtags",
  "use a bunch of emojis",
  "try to inspire the audience",
  "push a cryptocurrency or memecoin",
  "incorporate a trending topic",
  "brag about your achievements in tech",
  "argue about Indian politics",
  "talk about how much you ate for dinner",
  "complain about how it does not scale well",
  "brag about how much you can bench press",
];

const max_characters = 64;

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
  const prompt = `write something unique, witty and funny from any of these topics "${prompts.join(
    ","
  )}" for #techtwitter, make it more humanized, under ${max_characters} characters, including any one of these whenever seem required "${wildcards.join(
    ","
  )}"`;
  const nextTweet = await geminiModel.generateContent(prompt);
  const tweetInText = nextTweet.response.text();
  const { data } = await refreshedClient.v2.tweet(tweetInText);
  res.status(200).send({ data: data, tweetInText });
});
