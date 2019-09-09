"use strict";

const fs = require('fs');

function readJSON(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    let parsed;
    if (err)
      //propagate the error and exit the current function
      return callback(err);

    try {
      //parse the file contents
      parsed = JSON.parse(data);
    } catch (err) {
      //catch parsing errors
      return callback(err);
    }
    //no errors, propagate just the data
    callback(null, parsed);
  });
}

function readJSONThrows(filename, callback) {
  fs.readFile(filename, 'utf8', (err, data) => {
    let parsed;
    if (err)
      //propagate the error and exit the current function
      return callback(err);

    callback(null, JSON.parse(data));
  });
}

let cb = (err, data) => {
  if (err) {
    return console.error(err);
  }

  console.log(data)
};

readJSON('valid_json.json', cb); // dumps the content
readJSON('invalid_json.json', cb); // prints error (SyntaxError)

readJSONThrows('valid_json.json', cb); // dumps the content
readJSONThrows('invalid_json.json', cb); // prints error (SyntaxError)

process.on('uncaughtException', (err) => {
  console.error("Catch errors: " + err.message);
  process.exit(1);
})