const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 1601;

app.use(express.static(__dirname));

app.get(/^\/$|^\/index(\.html)?$/gm, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get(/^\/$|^\/ants(\.html)?$/gim, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "simulation", "ants.html"));
});
app.get(/\//, (req, res) => {
  res.send("404");
});

app.listen(port, () => console.log(`http://localhost:${port}`));
