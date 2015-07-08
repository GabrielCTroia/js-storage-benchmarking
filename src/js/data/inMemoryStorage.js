'use strict';

function populateMemoryStorage(n) {
  window.memoryStorage = window.memoryStorage || {};

  _.map(new Array(n), function () {
    window.memoryStorage[getRandomString(9)] = getRandomString(50);
  });

  console.log('Populated', _.keys(window.memoryStorage).length, 'items to Memory Storage');
}

function clearMemoryStorage() {
  var l = _.keys(window.memoryStorage).length;
  window.memoryStorage = {};

  console.log('Cleared', l, 'items from Memory Storage');
}

var readMemoryStorage = read.bind(null, window.memoryStorage);