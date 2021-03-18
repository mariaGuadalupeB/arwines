const router = require('express').Router();
const productRoute = require('./productRoute');
const userRoute = require('./userRoute');
const cartRoute = require('./cartRoute');
const categoryRoute = require('./categoryRoute');
const reviewRoute = require('./reviewRoute');
const cartItemRoute = require('./cart_itemRoute')
const searchRoute = require('./searchRoute')


router.use('/product', productRoute);
router.use('/user', userRoute);
router.use('/cart', cartRoute);
router.use('/admin', userRoute);
router.use('/category', categoryRoute);
router.use('/review', reviewRoute);
router.use('/cartItem', cartItemRoute)
router.use('/search', searchRoute)




module.exports = router;