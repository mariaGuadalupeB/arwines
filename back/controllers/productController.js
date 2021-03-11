const Category = require('../db/models/Category');
const Product = require('../db/models/Product');
const helpers = require('../utils/helpers');

const controller = {};

controller.getProducts = (req, res, next) => {
    Product.findAll({ include: Category })
        .then(products => res.status(200).send(products))
        .catch(next);
};

controller.getProductById = (req, res, next) => {
    Product.findByPk(req.params.id, { include: Category })
        .then(product => product ? res.status(200).send(product) : res.sendStatus(404))
        .catch(next);
};

controller.updateProduct = (req, res, next) => {
    Product.findByPk(req.params.id)
        .then(product => {
            if(!product) res.sendStatus(404);
            else {
                product.update(req.body)
                    .then(product => {
                        helpers.categoryHelper(req.body.categories)
                            .then(categories => {
                                product.setCategories(categories);
                                res.status(200).send(product);
                            })
                            .catch(next);
                    })
            }
        })
        .catch(next);
};

controller.deleteProduct = (req, res, next) => {
    Product.findByPk(req.params.id)
        .then(product => product ? product.destroy().then(() => res.status(200).send('Product was deleted')) : res.sendStatus(404))
        .catch(next);
};

controller.createProduct = (req, res, next) => {
    Product.findOne({ where: { name: req.body.name }})
        .then(product => {
            if(product) res.status(200).send('Product already exists');
            else {
                Product.create(req.body)
                .then(product => {
                    helpers.categoryHelper(req.body.categories)
                        .then(categories => {
                            product.addCategories(categories)
                            res.status(200).send(product);
                        })         
                        .catch(next);
                })
            }
        })
        .catch(next); 
};

module.exports = controller;