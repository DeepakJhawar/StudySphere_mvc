var express = require("express");
var router = express.Router();
const Contact = require("../models/contactModel");
const helpAdminMiddleware = require("../middlewares/helpadminMiddleware");
const isLoggedMiddleware = require("../middlewares/isLoggedMiddleware");

router.get(
  "/contacts",
  isLoggedMiddleware,
  helpAdminMiddleware,
  async (req, res) => {
    try {
      const details = await Contact.find();
      res.render("queries", { details });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post('/contact', async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newContact =new Contact({
      'name': data.name,
      'email': data.email,
      'message': data.message
    });
    console.log(newContact);
    await newContact.save();
    return res.status(200).json({ message: "Query submitted successfully" });
  }catch(error){
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
