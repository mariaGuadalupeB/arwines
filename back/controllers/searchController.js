const { Category, Product } = require('../db/models')
const { Op } = require("sequelize");

const controller = {};


controller.searchProducts = (req, res, next) => {

    const keys = Object.keys(req.query)
    let allResults = []

    if (keys.length > 0) {
        Category.findAll({
            where: { name: { [Op.like]: '%' + req.query[keys[0]].toUpperCase() + '%' } },
        })
            .then(categories => {
                if (categories.length) {
                    return categories[0].getProducts()
                } 
            })
            .then((x) => {
                x && allResults.push(x)
                
                Product.findAll({
                    where: {
                        [Op.or]: [
                            { [keys[0]]: { [Op.like]: '%' + req.query[keys[0]].toUpperCase() + '%' } },
                            { description: { [Op.like]: '%' + req.query[keys[0]] + '%'} },
                        ]
                    },
                    raw:true
                })
                .then(products => {
                    allResults.push(products)
                    const arr = [] 
                    allResults.flat().forEach( item => {

                        let ifExist = false
                        if(ifExist == false) arr.push(item)
                        
                        arr.forEach( arrItem => {
                            if(item.id == arrItem.id) ifExist = true
                        })
                        
                    })

                        return res.status(200).send(allResults.flat())
                    }
                        )
                        .catch(next);
                        
            })
            .catch(next);
    }else{
        res.status(404).send("Product not found")
    }

}


module.exports = controller;