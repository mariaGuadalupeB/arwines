const router = require('express').Router();
const productController = require('../controllers/productController');
const isQuery = require('../middleware/query')

router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.post('/', productController.createProduct);
router.get('/', isQuery, productController.getProducts);

module.exports = router;