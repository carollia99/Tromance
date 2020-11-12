const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const explore = require('./modules/explore')

var cors = require('cors');
const app = express();

const password = 'Carol1234';
const uri = `mongodb+srv://carol:${password}@cluster0.8rd9p.mongodb.net/?retryWrites=true&w=majority`;
const mongo = new MongoClient(uri, {useUnifiedTopology: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to mongodb database
mongo.connect(function (err) {
    if (!err) {
        console.log("successfully connected to database!" );
    } else {
        console.log("error connecting to database.");
        console.log(err);
    }

    const db = mongo.db('Tromance-app');

    // write your endpoints for getting + adding data here. the below is an example retrieving all objects from Users collection
    app.get('/allUsers', (request, response) => {
       db.collection('Users').find({})
           .toArray()
           .then((result) => {
               response.status(200).json(result)
           })
           .catch((error) => {
               response.status(400).send(error.message);
           })
    });


    app.post('/explore', (request, response) => {
        const username = request.body.username;
        const query = {'username': username};
        var toCompare;
        db.collection('Users').find(query)
            .toArray(function(err,result) {
                if (err) throw err;
                toCompare = result[0];
            });
        const query2 = {'username': { $ne : username }}
        db.collection('Users').find(query2)
            .toArray()
            .then((result) => {
                response.status(200).json(explore.sortUsers(result, toCompare));
            })
            .catch((error) => {
                response.status(400).send(error.message);
            })
    });



});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(5000, function () {
    console.log('Listening on port 5000!');
});