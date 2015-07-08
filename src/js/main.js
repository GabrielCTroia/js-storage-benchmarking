var ctx = document.getElementById("myChart").getContext("2d");

var lineChart = new Chart(ctx).Line({
  labels  : [],
  datasets: [
    {
      label               : "In Memory Read",
      fillColor           : colorNameToRgba('blue', .2),
      strokeColor         : colorNameToRgba('blue', .4),
      pointColor          : colorNameToRgba('blue', .6),
      pointStrokeColor    : "#fff",
      pointHighlightFill  : "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data                : []
    },
    {
      label               : "Local Storage Read",
      fillColor           : colorNameToRgba('green', .2),
      strokeColor         : colorNameToRgba('green', .4),
      pointColor          : colorNameToRgba('green', .6),
      pointStrokeColor    : "#fff",
      pointHighlightFill  : "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data                : []
    }

  ]
}, getChartOptions());

var $legend = document.createElement('div');
$legend.innerHTML = lineChart.generateLegend();

document.body.appendChild($legend);

function getChartOptions() {
  return {
    legendTemplate: '<ul>'
    + '<% for (var i=0; i<datasets.length; i++) { %>'
    + '<li>'
    + '<span style=\"color:<%=datasets[i].pointColor%>\">'
    + '<% if (datasets[i].label) { %><%= datasets[i].label %><% } %></span>'
    + '</li>'
    + '<% } %>'
    + '</ul>'
  }
}


function getBreakPoints() {
  return [1, 10, 100, 1000, 10000];
}

var benchmarkReadInMemoryStorage = function () {
  return _.reduce(getBreakPoints(), function (result, val) {
    result[val] = benchmark(
        function () {
          read(window.memoryStorage)
        },
        function () {populateMemoryStorage(val)},
        clearMemoryStorage);

    return result;
  }, {});
};


var benchmarkReadLocalStorage = function () {
  return _.reduce(getBreakPoints(), function (result, val) {
    result[val] = benchmark(
        function () {
          read(window.localStorage)
        },
        function () {populateLocalStorage(val)},
        clearLocalStorage);

    return result;
  }, {});
};


function runBenchMarkAndUpdateChart() {
  _.map(combine([benchmarkReadInMemoryStorage(), benchmarkReadLocalStorage()]), function (val, key) {
    lineChart.addData(val, key, getChartOptions());
  });
}

function combine(collection) {
  var res = {};

  for (var i = 0; i < collection.length; i++) {
    for (var k in collection[i]) {
      if (collection[i].hasOwnProperty(k)) {
        res[k] = res[k] || [];
        res[k].push(collection[i][k]);
      }
    }
  }

  return res;
}


var a = {
  10  : 1123,
  100 : 123213,
  1000: 11231
};

var b = {
  10  : 1123,
  100 : 123213,
  1000: 11231
};


var ab = {
  10  : [1123, 1123],
  100 : [123213, 123213],
  1000: [11231, 11231]
};