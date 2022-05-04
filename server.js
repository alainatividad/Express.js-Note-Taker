const express = require("express");
const path = require("path");
const api = require("./routes/index.js");

// use either environment PORT or 3001 (for testing)
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware for parsing JSON data
app.use(express.json());
// Middleware for using all files in the public folder
app.use(express.static("public"));
// Added index.js that acts as an overall router
app.use("/api", api);

// GET Route for notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

// Wildcard route to direct users to index.html
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
