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
 * Routes
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
