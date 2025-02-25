//sending data from client using form
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

app.post("/form-submit", (req, res) => {
  console.log(req.body);
  res.send("data recieved");
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
