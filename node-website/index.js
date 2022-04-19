/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const fs = require("fs");
const { isJSDocAugmentsTag } = require("typescript");

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
  res.render("index", { "title": "Home" });
})

app.get("/games", (req, res) => {
  let games = new Array();
  fs.readdirSync(path.join(__dirname, "../website/public/games")).forEach(file => {
    if (fs.lstatSync(path.join(__dirname, "../website/public/games", file)).isDirectory()) games.push(file)
  })
  res.render("games", { "title": "Games", "content": games });
})

app.get("/games/:game", (req, res) => {
  res.sendFile(path.join(__dirname, "../website/public/games/", req.params.game, "index.html"));
})

app.get("/school", (req, res) => {
  let content = new Array();
  fs.readdirSync(path.join(__dirname, "../website/public/school")).forEach(file => {
    if (fs.lstatSync(path.join(__dirname, "../website/public/school", file)).isDirectory()) content.push(file)
  })
  res.render("school", {"title": "School","content": content });
})

app.get("/school/:content", (req, res) => {
  res.sendFile(path.join(__dirname, "../website/public/school/", req.params.content, "index.html"));
})

/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
})