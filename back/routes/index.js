const router = require('express').Router();
const productRoute = require('./productRoute');
const userRoute = require('./userRoute');
const cartRoute = require('./cartRoute');
const categoryRoute = require('./categoryRoute');
const cartItemRoute = require()

router.use('/product', productRoute);
router.use('/user', userRoute);
router.use('/cart', cartRoute);
router.use('/admin', userRoute);
router.use('/category', categoryRoute);
router.use('/', cartItemRoute)

module.exports = router;