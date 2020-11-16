const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
    first: {
        type: String,
    },
    last: {
        type: String,
    },
    age: {
        type: Number,
    },
    personality: {
        type: String,
    },
    bio: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    profilePicture: {
        type: String,
    }
}, { collection: 'Users' });
module.exports = mongoose.model("Users", UserSchema);