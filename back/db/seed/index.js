
const Category = require('../models/Category')
const Product = require('../models/Product')
const User = require('../models/User')
const users = require("./users");
const products = require("./products");
const categories = require("./categories");



let bulkUsers = () => User.bulkCreate(users)
    .then(res => res);

let bulkProducts = () => Product.bulkCreate(products)
    .then(res => res);

let bulkCategories = () => Category.bulkCreate(categories)
    .then(res => res);



Promise.all([bulkUsers(),bulkProducts(), bulkCategories()]).then(x=>{
  console.log('base de datos seedeada OK')
  return x
})