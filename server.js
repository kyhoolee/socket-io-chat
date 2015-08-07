var express = require('express'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  morgan = require('morgan'),
  participants = [];

app.set('port', process.env.PORT || 5000);
app.use(morgan('dev')); // set request logging
app.use(express.static(__dirname + '/public')); // serve static directory
require('./cors.js')(app); // configure cors
require('./routes.js')(app, participants); // serve app routes
require('./socketEvents.js')(io, participants); // event handlers

http.listen(app.get('port'), function() {
  console.log('Running on ' + app.get('port'));
});
