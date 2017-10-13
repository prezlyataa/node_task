var express = require('express');
var app = express();

app.use(express.static('public'));

const jsonfile = require('./tree-structure.json');

app.get('/structure-visualization-tree', function(req, res) {
    res.sendfile('index.html');
});

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.get('/structure-source', function(req, res) {
    res.json(jsonfile);
});

var port = 8080;
app.listen(port);

console.log('Server has been started on '+ port + ' port');