const router = require('express').Router();
const productRoute = require('./productRoute');
const userRoute = require('./userRoute');
const cartRoute = require('./cartRoute');
const categoryRoute = require('./categoryRoute');
<<<<<<< HEAD
const reviewRoute = require('./reviewRoute');
=======
const cartItemRoute = require()
>>>>>>> b1e77a50fc39f9f09b5068fcc27c84c01adbe717

router.use('/product', productRoute);
router.use('/user', userRoute);
router.use('/cart', cartRoute);
router.use('/admin', userRoute);
router.use('/category', categoryRoute);
<<<<<<< HEAD
router.use('/review', reviewRoute);
=======
router.use('/', cartItemRoute)
>>>>>>> b1e77a50fc39f9f09b5068fcc27c84c01adbe717

module.exports = router;