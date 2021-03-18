const { Product } = require('../db/models');
const Review = require('../db/models/Review');
const User = require('../db/models/User');

const controller = {};

controller.addReview = (req, res, next) => {
    const {rating, comment, productId} = req.body;
    const {userId} = req.user

    Review.create({rating, comment})
        .then(async review => {
            let user = await User.findByPk(userId);
            await review.setUser(user);
            
            let product = await Product.findByPk(productId);
            await review.setProduct(product);

            res.status(201).send(review);
        })
        .catch(next);
        
};

module.exports = controller;