/**
 * My global variables
 */
let userMessage;
const EventEmitter = require("events");
const myEmitter = new EventEmitter();
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

// const server = require("http").createServer(app);
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

/**
 * Web Socket logic
 */
wss.addListener("message",()=>{
  wsClient.send(JSON.stringify({body: userMessage}));
})

wss.on("connection", (ws) => {
  wsClient = ws;
  ws.on("error", console.error);
  // ws.listening
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




    // if(comparison.length = 1){
    // console.log("SERVER: ", incoming.greet);
    // } else if(true){}else{console.log("default case for ")}
  };
  ws.on("upgrade",(ws)=>{console.log("hit")})

  ws.onclose = (close) => {
    console.log("onClose function working");
  };
});
