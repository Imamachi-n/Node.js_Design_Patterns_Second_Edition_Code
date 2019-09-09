"use strict";

const fs = require('fs');
const cache = {};

function consistentReadAsync(filename, callback) {
  if (cache[filename]) {
    process.nextTick(() => callback(cache[filename]));
  } else {
    //asynchronous function
    fs.readFile(filename, 'utf8', (err, data) => {
      cache[filename] = data;
      callback(data);
    });
  }
}

consistentReadAsync('data.txt', (data) => {
  console.log("First: " + data);
  console.log(cache);

  // the next call will read from the cache but still be async
  consistentReadAsync('data.txt', (data) => console.log("Second: " + data));
  console.log(cache);
});