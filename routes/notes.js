const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
// use helper fsUtils that is available on previous class activities
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

// GET Route for retrieving all the notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific tip
notes.get("/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json(`No note with ID ${noteId}`);
    });
});
module.exports = notes;
