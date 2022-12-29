const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

let req= {body:{message: "shit"}};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("."));
app.get("/", (req, res) => {
  res.send("hello world!");
});
app.post("/", (req, res) => {
  console.log(req.body);
});
app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
app.get;
