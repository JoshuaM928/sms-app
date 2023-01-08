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
 * Routes
 */
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
app.get("/conversation", (req, res, next) => {
  req.accepts("text/html");
  res.send("you've made it to the http://127.0.0.1:3000/conversation url");
});
app.post("/conversation", (req, res, next) => {
  console.log(req.body);
  res.send("The backend received your message!");
});
app.get("/favicon.ico", (req, res, next) => {
  res.sendFile(__dirname + "/favicon.ico");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
