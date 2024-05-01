const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb+srv://deepakj22:bS4Y1Cqn1enCHP4q@studysphere.xkyr9rx.mongodb.net/login-tut?retryWrites=true&w=majority&appName=StudySphere");

connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

const Loginschema = new mongoose.Schema({
    email: {
        type: String,
        reqiured: true,
        unique: true
    },
    name: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "End User"
    },
    joinedRooms: [
        {
            roomName: String,
            time: Date
        }
    ]
});

const collection = new mongoose.model("users", Loginschema);

module.exports = collection;