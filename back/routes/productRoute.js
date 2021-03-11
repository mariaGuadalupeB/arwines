const router = require('express').Router();
const productController = require('../controllers/productController');

router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/', productController.createProduct);
router.get('/', productController.getProducts);

module.exports = router;