const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

router.get('/:id/products', categoryController.getProductsByCategory);
router.get('/', categoryController.getCategories);
router.delete('/:id', categoryController.deleteCategory);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);

module.exports = router;