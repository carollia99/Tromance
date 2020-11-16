const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
    info: {
        type: Object,
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
        }
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    }
});
module.exports = User = mongoose.model("Users", UserSchema);