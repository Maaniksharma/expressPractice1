// "Create an Express server that renders an EJS template (index.ejs) to display a list of products. The products should be passed dynamically from the server to the template. Use the following array of products";

// const products = [
//   { id: 1, name: 'Laptop', price: 1000 },
//   { id: 2, name: 'Phone', price: 500 },
//   { id: 3, name: 'Tablet', price: 700 },
// ];

// The EJS template should display the products in an HTML table with columns for ID, Name, and Price."
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

function authMiddleware(req, res, next) {
  if (req.headers.Authorization) {
    next();
  } else {
    res.status(403).send("forbidden");
  }
}

app.post("/api/users", (req, res) => {
  const users = req.body;
  const filteredUsers = users.filter((user) => user.age > 18);
  res.json(filteredUsers);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
