const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("."));
app.get("/", (req, res) => {
  res.send("hello world!");
});
app.post("/", (req, res) => {
  console.log("IM IN!");
});
app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
app.get;
