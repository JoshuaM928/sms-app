const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("."));
app.get("/", (req, res) => {
  res.sendStatus(200);
});
app.post("/", (req, res) => {
  client.messages
    .create({
      body: req.body.message,
      from: "+17262684011",
      to: req.body.phoneNumber,
    })
    .then((message) => console.log(message.sid));
  console.log(req.body);
});
app.post("/", (req, res) => {
  console.log("IM IN!");
});
app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
