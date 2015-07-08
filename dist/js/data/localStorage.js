'use strict';

function populateLocalStorage(n) {
  _.map(new Array(n), function () {
    localStorage.setItem(getRandomString(9), getRandomString(50));
  });

  console.log('Populated', _.keys(window.localStorage).length, 'items to Local Storage');
}

function clearLocalStorage() {
  var l = _.keys(localStorage).length;
  localStorage.clear();

  console.log('Cleared', l, 'items from Local Storage');
}

var readLocalStorage = read.bind(null, localStorage);