'use strict';

var cluster = require('cluster');

process.env.PORT = process.env.PORT || 3000;

cluster.setupMaster({
  exec: 'worker.js'
});

var numWorkers = require('os').cpus().length;
console.log('Master cluster setting up %d workers...', numWorkers);

for (var i = 0; i < numWorkers; i++) {
  cluster.fork(process.env);
}

cluster.on('online', function(worker) {
  console.log('Worker %d is online', worker.process.pid);
});

cluster.on('exit', function(worker, code, signal) {
  console.log('worker %d died (%s). restarting...',
    worker.process.pid, signal || code);

  cluster.fork(process.env);
});

console.log('listening on http://localhost:%d', process.env.PORT);
