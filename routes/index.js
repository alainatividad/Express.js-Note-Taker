const express = require("express");

// Import our modular router for /notes
const notesRouter = require("./notes");
const app = express();
// create a router for /api/notes and then use the imported router to handle the router
app.use("/notes", notesRouter);
module.exports = app;
