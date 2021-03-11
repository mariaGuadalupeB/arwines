const router = require('express').Router();
const cartController = require("../controllers/cartController");
const authJWT = require('../middleware/authJWT');

router.put("/", authJWT, cartController.saveCart);

module.exports = router