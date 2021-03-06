const Category = require('../db/models/Category');
const Cart_item = require('../db/models/Cart_item');
const Cart = require('../db/models/Cart');

const helpers = {}

helpers.categoryHelper = (categories) => {
    console.log(categories , `HELPER`)
    if (categories) {
        const categoriesPromises = categories.map(category => Category.findOrCreate( { where: { name: category }}))

        return Promise.all(categoriesPromises).then(categories => categories.flat().filter(c => typeof c !== 'boolean'));
    }
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

helpers.mergeArrayOfObjects = arr => {
    
    output = []

    arr.forEach(item => {
        let existing = output.filter(v => {
          return v.productId == item.productId;
        });
        if (existing.length) {
            let existingIndex = output.indexOf(existing[0]);
          output[existingIndex].quantity += item.quantity;
        } else {
          output.push(item);
        }
      });
      return output
}

module.exports = helpers;

