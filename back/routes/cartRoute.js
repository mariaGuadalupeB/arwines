const router = require('express').Router();
const cartController = require("../controllers/cartController");
const authJWT = require('../middleware/authJWT');

router.put("/", authJWT, cartController.saveCart);
router.post("/", authJWT, cartController.checkOutCart);
router.delete("/:cartId", authJWT, cartController.rejectCart);
router.put("/:cartId", authJWT, cartController.confirmCart);
router.get('/', authJWT, cartController.getCarts);
router.get('/history', authJWT, cartController.getCarts_items);
router.post("/sendemail", /* authJWT, */ cartController.checkOutCart)

module.exports = router