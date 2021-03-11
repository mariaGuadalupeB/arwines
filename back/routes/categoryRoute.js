const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

router.get('/:id/products', categoryController.getProductsByCategory);

module.exports = router;