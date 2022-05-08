const fs = require("fs");
const util = require("util");

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  // stringifies content (assumed object) before writing into the file
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  // first read the file
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // if there's no error, convert JSON string to object
      const parsedData = JSON.parse(data);
      // so that the added content can be pushed into the array
      parsedData.push(content);
      // store the newly created array to the given file
      writeToFile(file, parsedData);
      console.info(`\nData added to ${file}`);
    }
  });
};
/**
 *  Function to delete a specific item with given id from a given file
 *  @param {string} contentId The contentId you want to delete from the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const deleteIdFromFile = (contentId, file) => {
  readFromFile(file)
    // convert JSON string to object so we could use array functions in it
    .then((data) => JSON.parse(data))
    .then((dataObj) => {
      // filter the array object so that we get all objects except for the one with selected ID
      const filteredData = dataObj.filter((item) => item.id !== contentId);

      // write to the file the filteredData
      writeToFile(file, filteredData);
      console.info(`\nItem ${contentId} has been deleted from ${file}`);
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend, deleteIdFromFile };
