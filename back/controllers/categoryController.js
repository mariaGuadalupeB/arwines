const Category = require('../db/models/Category');

controller = {};

controller.getProductsByCategory = (req, res, next) => {
    Category.findByPk(req.params.id)
        .then(category => category ? category.getProducts().then(products => res.status(200).send(products)) : res.sendStatus(404))
        .catch(next);
};

module.exports = controller;