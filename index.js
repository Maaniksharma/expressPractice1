const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

const sessionConfiguration = {
  secret: "tryfgvfyuygd",
};

app.use(session(sessionConfiguration));

const USERS = [];

app.get("/dashboard", (req, res) => {
  if (req.session.isAuthenticated) {
    res.sendFile(__dirname + "/views/Dashboard.html");
  } else {
    res.send("you are unauthenticaed");
  }
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
    res.redirect("/dashboard");
  } else {
    res.send("Invalid password");
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
