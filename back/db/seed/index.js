
const Category = require('../models/Category')
const Product = require('../models/Product')
const User = require('../models/User')
const users = require("./users");
const products = require("./products");
const categories = require("./categories");
const prod_cats = require("./prod_cat")
const { findOne } = require('../models/Product');


let bulkUsers = () => User.bulkCreate(users)
    .then(res => res);

let bulkCategories = () => Category.bulkCreate(categories)
        .then(res => res);

let bulkProducts = () => Product.bulkCreate(products)
    .then(res => res);




Promise.all([bulkUsers(), bulkCategories(), bulkProducts()]).then(x=>{
  console.log('base de datos seedeada OK')
  return x
})



  