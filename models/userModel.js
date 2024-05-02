const mongoose = require('mongoose');
const connect = mongoose.connect(process.env.DATABASE);

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