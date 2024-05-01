const collection = require("../models/userModel.js");

module.exports = async (req, res, next)=>{
    const user = await collection.findOne({'email': req.user.email})
    if (user.role == "End User"){
        return res.redirect("/");
    }
    next()
}