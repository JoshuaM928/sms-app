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
app.use(express.json());

/**
 * Twilio routes
 */
app.post("/twilio/send", (req, res, next) => {
  const data = req.body;
  client.messages.create({
    body: data.message,
    to: data.number,
    from: "+17262684011",
  });
  console.log("-----------------------");
  console.log(`Incoming Message: ${data.message}`);
  console.log("-----------------------");
  res.send({ confirm: "confirmation" });
  next();
});
app.get("/twilio/receive", (req, res, next) => {
  res.send("URI: /twilio/receive");
  console.log("URI: /twilio/receive");
});

/**
 * Express routes
 */
app.post("/conversation", (req, res, next) => {
  const data = req.body;
  console.log(data.message);
  res.json({ confirm: "confirmation" });
  // console.log(req.body);
});

/**
 * Necessary express routes
 */
app.get("/favicon.ico", (req, res, next) => {
  res.sendFile(__dirname + "/favicon.ico");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
