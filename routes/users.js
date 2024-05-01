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

router.get('/editProfile', isLoggedMiddleware, (req, res) => {
  res.render('editProfile');
});

router.get('/profile', isLoggedMiddleware, (req, res) => {
  res.render("profile");
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
