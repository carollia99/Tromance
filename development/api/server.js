const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const explore = require('./modules/explore')
const passport = require("passport");

const users = require("./routes/api/users");

const stream = require('getstream');    //These libraries will be used for the notifications/feed
//const session = require('cookie-session');

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

    app.post('/profile/:id', (request, response) => {
        //console.log("Viewing Profile");
        const username = request.params.id;
        const usernameToCompare = request.body.username;
        var toCompare;
        db.collection('Users').findOne({'username': usernameToCompare}).then((result) => {
            toCompare = result;
        })
        const query = {'username': username};
        db.collection('Users').find(query)
            .toArray() //returns users as array
            //promise
            .then((result) => {
                if (result.length <= 0) {
                    return response.status(404).json("Fail");
                }
                result[0]["compatibility"] = 0;
                if (toCompare != null) result[0]["compatibility"] = explore.getCorrelation(result[0], toCompare) * 100 / 4;
                response.status(200).json(result[0]);
            })
            .catch((error) => {
                response.status(400).send(error.message);
            })
    });

    app.post('/updateprofile', (req, response, next) => {
        const query = { 'username': req.body.username};
        const query1 = { $set: req.body };
        db.collection('Users').updateOne(query, query1 , function(err, res) {
            if (err) {
                console.log(err);
                //throw err;
            }
            console.log(res.result.nModified + " fields updated");
            response.status(200).json("Success");
        });
    });

    // Adds user "like" or "watch" to Stream feed. Add title to Mongo.
    //app.post('/itemAction/:username', async (req, res, next) => {  //I changed this line since we are now passing params in the body
    app.post('/itemAction', async (req, res, next) => {
        const client = stream.connect('2jj7dn7kmtug',
            '8bjm9c736g3j348dv2gyab6xsfwxg7ngwxw25as8fbq7a8f6a59zjfm2m4xtkecd',
            '100554'
        );
        const activity = {
            actor: "timeline",
            verb: "like",
            object: "test object",
            liker: req.body.username, //@Henry changed this line from 'params' to 'body'
            liked: req.body.liked,  //
        };

        let timeline;
        let feed = '';

        try {
            timeline = client.feed("timeline", activity.liked);
            await timeline.addActivity(activity);
            console.log("testing")
            feed = await timeline.get({limit: 5});
        } catch (err) {
            console.error("Stream error " + err);
            return next(err);
        }
        console.log(activity.liker);
        console.log(activity.liked);
        console.log(feed);
        //console.log(`${activity.actor} has just "${activity.verb}-ed" ${activity.object}.`);
        res.status(200).send("Like Successful.");

        try {
            await db.collection('Notifications').updateOne(
                {username: activity.liked},
                {$addToSet: { 'likes' : activity.liker}},
            );
            console.log("Addition to MongoDB successful");
        } catch (err) {
            console.error(err);
            return next(err);
        }

    });

    app.get('/feed', async (req, res) => {
        const client = stream.connect(  //Line in question
            '2jj7dn7kmtug',
            '8bjm9c736g3j348dv2gyab6xsfwxg7ngwxw25as8fbq7a8f6a59zjfm2m4xtkecd',
            '100554'
        );
        //TODO: resolve undefined username from cookies!
       // let timeline = client.feed("timeline", req.session.user.username); //line in question - had to change this line since
        //req.session.user is undefined, or at least idk what it does.
        let timeline = client.feed("timeline", req.body.username);
        const feed = await timeline.get({limit: 15});   //line in question
        console.log(feed);
        res.status(200).send(feed);
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


    // Passport middleware
    app.use(passport.initialize());
    // Passport config
    require("./config/passport")(passport);
    // Routes
    app.use("/api/users", users);

});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(5000, function () {
    console.log('Listening on port 5000!');
});