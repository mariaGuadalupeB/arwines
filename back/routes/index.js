const router = require('express').Router();
const productRoute = require('./productRoute');
const userRoute = require('./userRoute');
const cartRoute = require('./cartRoute');
const categoryRoute = require('./categoryRoute');

router.use('/product', productRoute);
router.use('/user', userRoute);
router.use('/cart', cartRoute);
router.use('/category', categoryRoute);

module.exports = router;