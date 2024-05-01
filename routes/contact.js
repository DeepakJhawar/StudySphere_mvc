var express = require('express');
var router = express.Router();
const helpAdminMiddleware = require('../middlewares/helpadminMiddleware')
const isLoggedMiddleware = require('../middlewares/isLoggedMiddleware')

router.get("/contacts", isLoggedMiddleware, helpAdminMiddleware, (req, res) => {
    res.send("Hi")
  });

module.exports = router;