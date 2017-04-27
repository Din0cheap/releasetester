var express = require('express');
var app = express();
var path = require('path');


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(3000, () => {
  console.log('Example listening on port 3000');
})

app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname + '/mochawesome-reports/mochawesome.html'));
});

app.use('/assets',express.static(__dirname + '/mochawesome-reports/assets'));