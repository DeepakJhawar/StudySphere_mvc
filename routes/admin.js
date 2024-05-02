var express = require('express');
var router = express.Router();

const bcrypt = require("bcrypt");
const collection = require("../models/userModel.js");

// MiddleWares
const adminMiddleware = require('../middlewares/adminMiddleware')
const isLoggedMiddleware = require('../middlewares/isLoggedMiddleware')


router.get("/", isLoggedMiddleware, adminMiddleware, async (req, res) => {
    let collections = ['user', 'contacts']
    res.render("admin", { 'name': req.user.name, 'collections': collections });
});

router.get("/users", isLoggedMiddleware, adminMiddleware, async (req, res) => {
    let users = await collection.find({})
    res.render("users", { 'name': req.user.name, 'users': users });
});

router.get("/useradd", isLoggedMiddleware, adminMiddleware, async (req, res) => {
    res.render("useradd", { 'name': req.user.name, 'error': '' });
});

router.post("/useradd", isLoggedMiddleware, adminMiddleware, async (req, res) => {
    var { email, name, password, role } = req.body;
    const existingUser = await collection.findOne({ email: email });
    if (existingUser) {
        return res.render("useradd", { 'name': req.user.name, 'error': 'Email Registered' });
    }
    const checkUserName = await collection.findOne({ name: name });
    if (checkUserName) {
        return res.render("useradd", { 'name': req.user.name, 'error': 'Username Taken' });
    }

    const data = {
        email: email,
        name: name,
        password: password,
        role: role
    };
    const saltrounds = 10;
    const hashPassword = await bcrypt.hash(data.password, saltrounds);
    data.password = hashPassword;

    const user = await collection.create(data);
    res.redirect("users");
});

router.get("/userupdate/:email", isLoggedMiddleware, adminMiddleware, async (req, res) => {
    const email = req.params.email
    const user = await collection.findOne({ 'email': email })
    if (!user) {
        return res.redirect("/admin/users");
    }
    res.render("userupdate", { 'name': req.user.name, 'user': user, 'error': '' });
});

router.post("/userupdate/:email", isLoggedMiddleware, adminMiddleware, async (req, res) => {
    const email = req.params.email
    var { role } = req.body;
    await collection.updateOne({ 'email': email }, { '$set': { 'role': role } })
    res.redirect("/admin/users");
});

router.delete("/users/:email", isLoggedMiddleware, adminMiddleware, async (req, res) => {
    const email = req.params.email;
    await collection.deleteOne({ email: email });
    res.send("Success");
});


module.exports = router;
