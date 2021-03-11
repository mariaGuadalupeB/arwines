const db = require("../index");
const { Model } = require("sequelize");
const S = require("sequelize");
const Category = require('./Category');
const User = require("./User")
const Cart_item = require("./Cart_item")


class Product extends Model {

}

Product.init(
	{
		name: {
			type: S.STRING,
			allowNull: false,
		},
        description: {
            type: S.STRING,
             allowNull: false,
        },
        weight: {
            type: S.STRING,
            allowNull: false,
        },
		brand: {
			type: S.STRING,
			allowNull: false,
		},
        quantity: {
            type: S.INTEGER,
            allowNull: false,
        },
        image_path: {
            type: S.STRING,
            allowNull: false,
        },
        price: {
            type: S.FLOAT,
            allowNull: false,
        },
	},
  { sequelize: db,
    modelName: "product", 
   }
);



User.belongsToMany(Product, {through:'favorites'})
Product.belongsToMany(User, {through:'favorites'})


Product.hasMany(Cart_item)
Cart_item.belongsTo(Product)

Product.belongsToMany(Category, {through: 'prod_cats'})
Category.belongsToMany(Product, {through: 'prod_cats'})

module.exports = Product;