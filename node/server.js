const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 1601;

app.use(express.static(__dirname));

app.get(/^\/$|^\/index(\.html)?$/gim, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get(/^\/$|^\/ants(\.html)?$/gim, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "simulation", "ants.html"));
});
app.get(/^\/flopedia(\.html)?$/gim, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "flopedia", "index.html"));
});
app.get(/^\/flopedia\/(.+)\/(.+)?$/gim, (req, res) => {
  const topic = req.params[0];
  const index = req.params[1].match(/\.html/) ? req.params[1] : req.params[1] + ".html";

  res.sendFile(path.join(__dirname, "views", "flopedia", topic, index));
});
app.get(/\//, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(port, () => console.log(`http://localhost:${port}`));
