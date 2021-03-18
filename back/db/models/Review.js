const db = require("../index");
const { Model } = require("sequelize");
const S = require("sequelize");

// const User = require("./User");
// const Product = require("./Product");

class Review extends Model {

}

Review.init(
	{
		comment: {
			type: S.STRING,
			allowNull: false,
		},
		rating: {
			type: S.INTEGER,
			allowNull: false
		}
	},

  { sequelize: db,
    modelName: "review", 
   }
);

// Review.belongsTo(Product)
// Product.hasMany(Review)
// Review.belongsTo(User)
// User.hasMany(Review)



module.exports = Review;