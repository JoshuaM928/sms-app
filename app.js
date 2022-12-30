const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("."));
app.get("/", (req, res) => {
  res.sendStatus(200);
});
app.post("/", (req, res) => {
  console.log(req.body);
});
app.post("/", (req, res) => {
  console.log("IM IN!");
});
app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
app.get;