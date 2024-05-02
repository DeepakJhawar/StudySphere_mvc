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

router.delete('/contacts/:message', async (req, res) => {
  const message = req.params.message;
  console.log("del")
  try {
      await Contact.deleteOne({ message: message });
      res.status(200).send('Query deleted successfully');
  } catch (err) {
      console.error('Error deleting query:', err);
      res.status(500).send('Internal server error');
  }
});

module.exports = router;
