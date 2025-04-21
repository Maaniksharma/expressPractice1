const { MongoClient } = require("mongodb");

//custom middlewares in express.js
const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

app.set("view engine", "ejs");

const sessionConfiguration = {
  secret: "tryfgvfyuygd",
};

app.use(session(sessionConfiguration));

const mongoClient = new MongoClient("mongodb://localhost:27017");

function checkAuth(req, res, next) {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.send("you are unauthenticaed");
  }
}

app.get("/dashboard", checkAuth, (req, res) => {
  res.render("Dashboard", { username: req.session.user.username });
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send({ message: "session destroyed successfully" });
});

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  await mongoClient.db("test").collection("users").insertOne({
    username: username,
    password: password,
  });
  res.redirect("/login.html");
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // const filteredUsers = USERS.filter((user) => user.username === username);
  const user = await mongoClient
    .db("test")
    .collection("users")
    .findOne({ username: username });
  if (user == null) {
    res.send("invalid username");
    return;
  }
  if (user.password === password) {
    req.session.isAuthenticated = true;
    req.session.user = user;
    res.redirect("/dashboard");
  } else {
    res.send("Invalid password");
  }
});

async function init() {
  console.log("connecting to mongodb database...");
  await mongoClient.connect();
  console.log("connected to mongodb database");
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}
init();
