/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  _ = require('underscore'),
  swig = require('swig'),
  fs = require('fs');

var app = express();

var server = http.createServer(app);

GLOBAL.salt = 'appians_medical_123454321';

// Template engine
app.engine('html', swig.renderFile);

// all environments
app.set('port', 3000);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser(salt));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.set('templates_path', path.join(__dirname, 'views'));

// Disable swig cache
app.set('view cache', false);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Export app
GLOBAL.app = app;


app.set('server_url', "http://medicians.org");
app.set('nserver', "http://localhost:7001");

/*
 * URLS
 */
app.get('/', routes.index);
app.post('/send', routes.send_email);

/*
 * Create server
 */
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});