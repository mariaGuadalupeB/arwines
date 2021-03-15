const Category = require('../db/models/Category');

controller = {};

controller.getProductsByCategory = (req, res, next) => {
    Category.findByPk(req.params.id)
        .then(category => category ? category.getProducts().then(products => res.status(200).send(products)) : res.sendStatus(404))
        .catch(next);
};

controller.getCategories = (req, res, next) => {
    Category.findAll()
        .then(categories => res.status(200).send(categories))
        .catch(next);
};

controller.deleteCategory = (req, res, next) => {
    Category.findByPk(req.params.id)
        .then(category => category ? category.destroy().then(() => res.status(200).send('Category was deleted')) : res.sendStatus(404))
        .catch(next);
};

controller.createCategory = (req, res, next) => {
    Category.create(req.body)
        .then(category => res.status(201).send(category))
        .catch(next)
}

controller.updateCategory = (req, res, next) => {
    Category.findByPk(req.params.id)
        .then(category => category ? category.update(req.body).then(cat => res.status(200).send(cat)) : res.sendStatus(404))
        .catch(next);
}

module.exports = controller;
