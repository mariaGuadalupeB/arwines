const Category = require('../db/models/Category');
const Cart_item = require('../db/models/Cart_item');
const Cart = require('../db/models/Cart');

const helpers = {}

helpers.categoryHelper = (categories) => {
    const categoriesPromises = categories.map(category => Category.findOrCreate( { where: { name: category }}))

    return Promise.all(categoriesPromises).then(categories => categories.flat().filter(c => typeof c !== 'boolean'));
}
helpers.firstCharToUpperCase = (str) =>{
    return str[0].toUpperCase() + str.slice(1)
}
helpers.getCart_items = (userId) => {
    return Cart.findOne({
        where: {userId, status: "active"},
        include: Cart_item
    })
    .then(cart=>cart)
} 

module.exports = helpers;

