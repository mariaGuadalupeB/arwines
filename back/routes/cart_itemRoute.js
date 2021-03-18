const router = require('express').Router();
const cartController = require("../controllers/cartItemController");

router.delete("/", cartController.deleteItem);


module.exports = router