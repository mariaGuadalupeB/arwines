// const Category = require('../db/models/Category');

const {Category} = require('../db/models')
const { Op } = require("sequelize");

controller = {};

controller.getProductsByCategory = (req, res, next) => {
    const valueToSearch = req.params.id
    if(isNaN(Number(valueToSearch))){
        Category.findOne({
            where: {
                name: {
                [Op.like]: valueToSearch +'%' /// agregar tu upper case o lower depende como se guarde el seed
                }
            }
        })
            .then(category => category ? category.getProducts().then(products => res.status(200).send(products)) : res.sendStatus(404))
            .catch(next)     
        
    }else{
        Category.findByPk(valueToSearch)
        .then(category => category ? category.getProducts().then(products => res.status(200).send(products)) : res.sendStatus(404))
        .catch(next);   
    }
};

module.exports = controller;