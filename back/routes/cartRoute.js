const router = require('express').Router();
const cartController = require("../controllers/cartController");
const authJWT = require('../middleware/authJWT');

router.put("/", authJWT, cartController.saveCart);
router.post("/", authJWT, cartController.checkOutCart);

// router.post("/sendemail", /* authJWT, */ cartController.checkOutCart)

module.exports = router