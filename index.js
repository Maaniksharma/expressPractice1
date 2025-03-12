const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

const USERS = [];

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
    res.redirect("/Dashboard.html");
  } else {
    res.send("Invalid password");
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
