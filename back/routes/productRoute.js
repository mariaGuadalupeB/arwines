const router = require('express').Router();
const productController = require('../controllers/productController');
const authJWT = require('../middleware/authJWT');
const isQuery = require('../middleware/query')


router.get('/:id', productController.getProductById);
// router.get('/', isQuery, productController.getProducts);
router.get('/', productController.getProductByDescription)

router.put('/:id', authJWT, productController.updateProduct);

router.delete('/:id', authJWT, productController.deleteProduct);

router.post('/', authJWT, productController.createProduct);

module.exports = router;