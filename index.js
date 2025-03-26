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

const USERS = [];

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

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  USERS.push({
    username: username,
    password: password,
  });
  console.log(USERS);
  res.redirect("/login.html");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const filteredUsers = USERS.filter((user) => user.username === username);
  if (filteredUsers.length === 0) {
    res.send("invalid username");
    return;
  }
  if (filteredUsers[0].password === password) {
    req.session.isAuthenticated = true;
    req.session.user = filteredUsers[0];
    res.redirect("/dashboard");
  } else {
    res.send("Invalid password");
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
