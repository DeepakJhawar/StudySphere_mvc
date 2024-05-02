var express = require('express');
var router = express.Router();
const collection = require("../models/userModel.js");
const isLoggedMiddleware = require('../middlewares/isLoggedMiddleware')

router.get("/dashboard", isLoggedMiddleware, (req, res) => {
  res.render("dashboard", { name: req.user.name, joinedRooms: req.user.joinedRooms });
});

router.get('/lobby', isLoggedMiddleware, (req, res) => {
  res.render('lobby');
});

router.post("/lobby", isLoggedMiddleware, (req, res) => {
  const roomId = req.body.room;
  res.redirect(`/room?room=${roomId}`);
});

router.get('/room', isLoggedMiddleware, (req, res) => {
  const roomId = req.query.room;
  res.render("room");
});

router.get('/whiteBoard', isLoggedMiddleware, (req, res) => {
  res.render('whiteBoard');
});

router.get('/editProfile', (req, res) => {
  res.render('editProfile', { email: req.user.email, name: req.user.name, occupation: req.user.occupation, phnumber: req.user.phnumber, address: req.user.address});
});

router.post('/UpdateProfile', async (req, res) => {
  await collection.updateOne({email: req.user.email}, {'$set': {...req.body}})
  res.json("done");
})

router.get('/profile', (req, res) => {
  res.render("profile", { email: req.user.email, name: req.user.name, occupation: req.user.occupation, phnumber: req.user.phnumber, address: req.user.address});
})

router.post("/join-room", isLoggedMiddleware, async (req, res) => {
  try {
    const data = req.body;

    const userId = req.session.passport.user;
    const user = await collection.findOne({ _id: userId });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }
    const roomData = {
      roomName: data.roomId,
      time: data.time,
    };

    user.joinedRooms.push(roomData);
    await user.save();
    return res.status(200).json({ message: "Room joined successfully" });
  } catch (error) {
    console.error("Error joining room:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
