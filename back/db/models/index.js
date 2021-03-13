const Cart_item = require("./Cart_item");
const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");
const Review = require("./Review");

// Role.belongsToMany(User,{through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'})

// User.belongsToMany(Product, {through:'favorites'})
// Product.belongsToMany(User, {through:'favorites'})

Cart.belongsTo(User)
User.hasMany(Cart);


Product.hasMany(Cart_item)
Cart_item.belongsTo(Product)

Product.belongsToMany(Category, {through: 'prod_cats'})
Category.belongsToMany(Product, {through: 'prod_cats'})

Cart.hasMany(Cart_item)
Cart_item.belongsTo(Cart)

Review.belongsTo(Product)
Product.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)


module.exports = { Cart_item, Cart, Category, Product, User, Review }
