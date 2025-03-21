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

app.get("/addtask", (req, res) => {
  if (req.session.isAuthenticated) {
    res.sendFile(__dirname + "/views/addTask.html");
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
    res.redirect("/addtask");
  } else {
    res.send("Invalid password");
  }
});
app.post("/addtask", (req, res) => {
  const task = req.body;
  if (req.session.tasks) {
    req.session.tasks.push(task);
  } else {
    req.session.tasks = [task];
  }
  res.json({
    message: "task inserted successfully",
  });
});

app.get("/showtasks", (req, res) => {
  res.json({ tasks: req.session.tasks });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
