const router = require('express').Router();
const productController = require('../controllers/productController');
const authJWT = require('../middleware/authJWT');

router.get('/:id', productController.getProductById);
router.put('/:id', authJWT, productController.updateProduct);
router.delete('/:id', authJWT, productController.deleteProduct);
router.post('/', authJWT, productController.createProduct);
router.get('/', productController.getProducts);

module.exports = router;