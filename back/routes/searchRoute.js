const router = require('express').Router();
const searchController = require("../controllers/searchController");

router.get("/", searchController.searchProducts);


module.exports = router