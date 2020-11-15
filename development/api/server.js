const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const explore = require('./modules/explore')

//const stream = require('getstream');
//const ObjectID = require('mongodb').ObjectID;
//const passport = require('passport');

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

    app.post('/profile', (request, response) => {
        //console.log("Viewing Profile");
        const username = request.body.username;
        const query = {'username': username};
        db.collection('Users').find(query)
            .toArray() //returns users as array
            //promise
            .then((result) => {
                response.status(200).json(result[0]);
            })
            .catch((error) => {
                response.status(400).send(error.message);
            })
    });

    app.post('/updateprofile', (req, res, next) => {
        const query = { 'Users': req.body};
        const query1 = { $set: req.body };
        db.collection('Users').updateOne(query, query1 , function(err, res) {
            if (err) throw err;
            console.log(res.result.nModified + " fields updated");
        });
    });
    /*
    app.post('/updateprofile', async (request, response, next) => {
        const client = stream.connect('v2692basaucu',
            'pf7wgbvwdur5ja8vqtgzkgruvs7qkym54q8yg6hkmhbtkcxfd2dgvcea9nj8tb32',
            '76203'
        const user = request.body.username;
        const age = request.body.age;

        let timeline;
        try {
            timeline = await client.feed("timeline", user);
            await timeline.age("timeline", age);
        } catch (err){
            console.log(err);
            return next(err);
        }
        // Update age
        try {
            await db.collection('Users').updateOne(
                {username: user},
                {$pull: {'age': age}},
            )
            await db.collection('Users').updateOne(
                { username: age },
                {$pull: {'age' : user}},
            )
        } catch(err){
            console.error(err);
            return next(err);
        }

    });
     */



});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(5000, function () {
    console.log('Listening on port 5000!');
});