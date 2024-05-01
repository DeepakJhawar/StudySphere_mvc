const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase');

const port = 3000;
const db = mongoose.connection;

const UserSchema = new mongoose.Schema({
    username: String,
    email: String
});

const User = mongoose.model('User', UserSchema);

function UpdateProfile(userid, profiledata) {
    User.findById(userID, { $set: newProfileData }, { new: true }, (err, user) => {
        if (err) {
            console.error("Error updating profile:", err);
            return;
        }
        console.log("Profile updated successfully:", user);
    });
}

module.exports = {
    UpdateProfile: UpdateProfile
};

const app = express();

app.post('/updateProfile', (req, res) => {
    const { username, email } = req.body;

    User.updateOne({}, { $set: { username: username, email: email } }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Error updating profile" });
        } else {
            console.log(result);
            res.redirect('/profilepage');
        }
    });
});

app.get('/', (req, res) => {
    res.redirect('/profilepage');
});

app.get('/profilepage', (req, res) => {
    User.findOne({})
        .then(user => {
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            res.render('/profilepage', { user: user });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Error fetching user data" });
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});