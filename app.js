/**
 *  TODO: Document code with comments by breaking it into chunks
 */
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
let httpServer = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const server = require("http").createServer(app);
const webSocket = require("ws");
const ws = new webSocket.Server({ server: httpServer });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio");
const client = require("twilio")(accountSid, authToken);

const replies = [];

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("."));
app.get("/", (req, res) => {
  res.sendStatus(200);
});
app.post("/", (req, res, next) => {
  if (req.body.sendBtn == 1) {
    client.messages
      .create({
        body: req.body.message,
        from: "+17262684011",
        to: req.body.phoneNumber,
      })
      .then(() => console.log("received"));
  }
  next();
});
app.post("/reply", (req, res, next) => {
  console.log("----------------------------");
  console.log(`incoming message: ${req.body.Body}`);
  console.log("----------------------------");
  client.messages.create({
    body: "received",
    from: "+17262684011",
    to: "6268640120",
  });
  replies.push(req.body.Body);
  next();
});
app.get("/reply", (req, res, next) => {
  res.json(replies);
  next();
});

/**
 * web socket middleware
 */
ws.on("open", () => {
  console.log("new client connected");
  ws.send("welcome new client");
  ws.on("message", (message) => {
    console.log("received: %s", message);
    ws.send("got your msg its:" + message);
  });
});
