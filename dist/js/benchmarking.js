function performanceTracker(fn, name) {
  return function () {
    console.log(name + ' started...');
    var t0 = performance.now();
    fn.apply(fn, arguments);
    var t1 = performance.now();

    console.log(name + ' took ' + (t1 - t0) + ' milliseconds');
    console.log('-----------');
  }
}

function benchmark(fn, prepareFn, cleanFn) {
  prepareFn();

  var t0 = performance.now();
  fn();
  var t1 = performance.now();

  cleanFn();

  console.log('Benchmark:', t1 - t0);
  console.log('----------');

  return t1 - t0;
}