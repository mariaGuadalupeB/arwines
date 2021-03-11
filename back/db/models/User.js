require('dotenv').config();

const db = require("../index");
const { Model } = require("sequelize");
const S = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const Cart  = require("./Cart");


class User extends Model {
	removeFavorite(product) {
		return this.removeFavorite(product)
	}
	hasFavorite(product) {
		return this.hasFavorite(product)
	}
	validPassword (loginPassword) {
		const salt = this.salt // 'askljdhlkiadufvolij123897asclkjhnawm'
		return this.password === bcrypt.hashSync(loginPassword, salt)
	}
	generateToken = function () {
        return jwt.sign(
            {
                userId: this.id,
                email: this.get('email'),
				admin: this.get('admin')
            },
            process.env.SECRET || 'arwines',
            {expiresIn: 360000}
        );
    };
}

User.init(
	{
		firstName: {
			type: S.STRING,
			allowNull: false,
		},
		lastName: {
			type: S.STRING,
			allowNull: false,
		},
		email: {
			type: S.STRING,
			 allowNull: false,
			 unique:true,
        },
        address: {
            type: S.STRING,
            allowNull: true,
        },
		password: {
			type: S.STRING,
			allowNull: false,
		},
		admin: {
			type: S.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		salt: {
			type: S.STRING, //askljdhlkiadufvolij123897asclkjhnawm,123
		},

	},
  { sequelize: db,
    modelName: "user", 
   }
);
User.beforeCreate((user) => {
	return bcrypt
		.genSalt(16)
		.then((salt) => {
			user.salt = salt;
			return bcrypt.hashSync(user.password, salt);
		})
		.then((hash) => {
			user.password = hash;
		});
});

Cart.belongsTo(User)
User.hasMany(Cart);

User.afterCreate((user) => {
	return user.createCart(Cart)
	.then(data => data)
}) 


// User.belongsToMany(Role,{through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'})
// User.hasMany(Cart);



module.exports = User;