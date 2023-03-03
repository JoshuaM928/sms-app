/**
 * My global variables
 */
let userMessage;
let wsClient;

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
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/**
 * Web Socket setup
 */
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server });

/**
 * Twilio setup
 */
const twilio = require("twilio");
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Routes
 */
app.post("/twilio/receive", (req, res, next) => {
  let data = req.body;
  userMessage = req.body;
  console.log(`New text message:${data.Body}`);
  wss.emit("message");
});

app.get("/", (req, res, next) => {
  console.log("client connected to Express server!");
});

app.get("/favicon.ico", (req, res, next) => {
  res.sendFile(__dirname + "/favicon.ico");
});

app.get("/styles/style.css", (req,res, next)=>{
  res.sendFile(__dirname + "/styles/style.css");
})

/**
 * Web Socket logic
 */
wss.addListener("message", () => {
  wsClient.send(JSON.stringify({ body: userMessage }));
});

wss.on("connection", (ws) => {
  wsClient = ws;
  ws.on("error", console.error);
  ws.onmessage = (message) => {
    const incoming = JSON.parse(message.data);
    const comparison = Object.keys(incoming);
    let selector = 2;
    if (comparison.length == 1) {
      selector = 1;
    } else if (comparison.length == 2) {
      selector = 2;
    } else {
      console.log("DEFAULT ELSE");
    }
    switch (selector) {
      case 1:
        console.log("SERVER: ", incoming.greet);
        break;
      case 2:
        client.messages.create({
          body: incoming.message,
          to: incoming.phone,
          from: "+17262684011",
        });
        console.log("SERVER: ", incoming);
        break;
      default:
        console.log("DEFAULT SWITCH");
    }
  };
  ws.onclose = (close) => {
    console.log("CLIENT DISCONNECTED");
  };
});
