/**
 * Twilio setup
 */
const twilio = require("twilio");
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Express setup
 */
const express = require("express");
const app = express();
const port = 3000;
app.use(express.static("public/images/"));
app.use(express.static("routes/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Express twilio routes
 */
app.post("/twilio/send", (req, res, next) => {
  const data = req.body;
  client.messages.create({
    body: data.message,
    to: data.number,
    from: "+17262684011",
  });
  console.log("-----------------------");
  console.log(`Incoming message request: ${data.message}`);
  console.log("-----------------------");
  res.send({ confirm: "confirmation" });
  next();
});

app.post("/twilio/receive", (req, res, next) => {
  const data = req.body;
  console.log(`New text message:${data.Body}`);
});

app.get("/", (req, res, next) => {
  console.log("client connected to Express server!");
});

/**
 * Necessary express routes
 */
app.get("/favicon.ico", (req, res, next) => {
  res.sendFile(__dirname + "/favicon.ico");
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/**
 * Web Socket setup
 */
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });
wss.on("connection", (ws) => {
  console.log("client connected to web Socket");
  ws.send("hello world");
});
