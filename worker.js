var express    = require('express');
var cors       = require('cors');
var bodyParser = require('body-parser');

var auth       = require('./routes/auth');
var register   = require('./routes/register');

var app = express();

app.use(bodyParser.json()); // Use the JSON body parser
app.use(cors()); // Enable CORS

// Set the server name for debugging
app.use(function(req, res, next) {
  if (process.env.HOSTNAME) {
    res.setHeader('Server', process.env.HOSTNAME);
  }

  next();
});

// Disable Etag for our authentication service
app.set('etag', false);
app.disable('x-powered-by');

app.post('/auth', auth);
app.post('/register', register);

app.listen(process.env.PORT, function(err) {
  if(err) throw err;

  console.log('Process ' + process.pid + ' is listening on ' + process.env.PORT);
});
