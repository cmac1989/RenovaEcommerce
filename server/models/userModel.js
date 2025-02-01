// const db = require('../config/database');
//
// const userModel = {
//     findByEmail: (email, callback) => {
//         const query = 'SELECT * FROM users WHERE email = ?';
//         db.query(query, [email], callback);
//     },
//     create: (id, username, email, password, callback) => {
//         const query = 'INSERT INTO users (id, username, email, password) VALUES (?, ?)';
//         db.query(query, [id, username, email, password], callback);
//     }
// };
//
// module.exports = userModel;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
    'User',
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        }

    },
    {
        // Other model options go here
        tableName: 'users',
        timestamps: true,
        underscored: true,
    },
);

console.log(User === sequelize.models.User); // true
module.exports = User;
