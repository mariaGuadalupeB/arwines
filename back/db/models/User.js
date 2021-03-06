require('dotenv').config();

const db = require("../index");
const { Model } = require("sequelize");
const S = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const Cart = require("./Cart");

class User extends Model {
	validPassword(loginPassword) {
		const salt = this.salt // 'askljdhlkiadufvolij123897asclkjhnawm'
		return this.password === bcrypt.hashSync(loginPassword, salt)
	}
	generateToken () {
        return jwt.sign(
            {
                userId: this.id,
                email: this.get('email'),
				isAdmin: this.get('admin')
            },
            process.env.SECRET || 'arwines',
            {expiresIn: 360000} //asd1iuh23kuhyasdhkjkhjasdasd
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
			unique: true,
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
	{
		sequelize: db,
		modelName: "user",
	}
);
User.beforeCreate((user) => {
	return bcrypt
		.genSalt(16)
		.then((salt) => {
			user.salt = salt;
			return bcrypt.hashSync(user.password, salt); //1234
		})
		.then((hash) => {
			user.password = hash;
		});
});

User.afterCreate((user) => {
	return user.createCart(Cart)
		.then(data => data)
})


module.exports = User;