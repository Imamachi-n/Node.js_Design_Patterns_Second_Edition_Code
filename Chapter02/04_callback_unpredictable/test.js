"use strict";

const fs = require('fs');
const cache = {};

function inconsistentRead(filename, callback) {
  if (cache[filename]) {
    // invoked synchronously
    callback(cache[filename]);
  } else {
    // asynchronous function
    fs.readFile(filename, 'utf8', (err, data) => {
      cache[filename] = data;
      callback(data);
    });
  }
}

function createFileReader(filename) {
  const listeners = [];
  inconsistentRead(filename, value => {
    console.log("callbacked...");
    listeners.forEach(listener => {
      console.log("listener...");
      console.log(value);
      return listener(value)
    });
  });

  return {
    onDataReady: listener => {
      console.log("onDataReady...")
      console.log(listener);
      return listeners.push(listener)
    }
  };
}

const reader1 = createFileReader('data.txt');
reader1.onDataReady(data => {
  console.log('First call data: ' + data);

  // ...sometime later we try to read again from
  // the same file
  const reader2 = createFileReader('data.txt');
  reader2.onDataReady(data => {
    console.log('Second call data: ' + data);
  });
});