#!/bin/env node
var express = require('express');
var bodyParser = require('body-parser'), favicon = require('serve-favicon'), logger = require("morgan"),
methodOverride = require('method-override'), servestatic = require('serve-static');
var routes = require('./routes');
var path = require('path');

var app = express();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
if (typeof ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            ipaddress = "127.0.0.1";
    };

app.set('ipaddress', ipaddress);
app.set('port', port);

var server = app.listen(app.get('port'), app.get('ipaddress'), function(){
  console.log('Express server listening on port ' + app.get('port'));


//var server = app.listen(app.get('port'));
var io = require('socket.io')(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
// app.use(app.router); no longer needed in 4!
app.use(servestatic(path.join(__dirname, 'public'))); 

// Handle Errors gracefully
app.use(function(err, req, res, next) {
    if(!err) return next();
    console.log(err.stack);
    res.json({error: true});
});

// Main App Page
app.get('/', routes.index);

// MongoDB API Routes
app.get('/polls/polls', routes.list);
app.get('/polls/:id', routes.poll);
app.post('/polls', routes.create);
app.post('/vote', routes.vote);  

io.on('connection', routes.vote);

});


