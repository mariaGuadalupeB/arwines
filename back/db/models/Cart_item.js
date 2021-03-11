const db = require("../index");
const { Model } = require("sequelize");
const S = require("sequelize");

const Product = require("./Product");

class Cart_item extends Model {

}

Cart_item.init(
	{
		quantity: {
			type: S.INTEGER,
			allowNull: false,
		},
	},

  { sequelize: db,
    modelName: "cart_item",
   }
);


module.exports = Cart_item;