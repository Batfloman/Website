const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 1601;

app.use(express.static(__dirname));

app.get(/^\/$|^\/index(\.html)?$/, (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
})

app.listen(port, () => console.log(`http://localhost:${port}`));