//Dependencies
var express = require('express');
var path = require("path");

//Create the app
var app = express();

/*
* Middle Ware
*/

//Public Directories
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/apidoc', express.static(path.join(__dirname, 'apidoc')));

//Jade
app.set('view engine', 'jade');

/*
* Routes
*/

var apiRoute = require('./routes/api.js');

//Spa home page
app.get('/', function (req, res) {
    res.render("index");
});

//Send partials
app.get('/partials/:id', function(req, res) {
   res.render(__dirname+'/views/partials/'+req.params.id);
});

app.get('/test', function(req, res) {
    res.send("hi from /test");
});

//Yelp Api
app.use('/api', apiRoute);

//Export the app object
module.exports = app;
