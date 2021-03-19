const router = require('express').Router();
const reviewController = require('../controllers/reviewController');
const authJWT = require('../middleware/authJWT');

router.post('/', authJWT, reviewController.addReview);
router.get('/', authJWT, reviewController.reviewExists);

module.exports = router;