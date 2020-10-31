const express = require('express');
const bodyParser = require('body-parser');

var cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(5000, function () {
    console.log('Listening on port 5000!');
});