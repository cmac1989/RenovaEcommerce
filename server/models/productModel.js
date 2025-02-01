// const db = require('../config/database');
//
// const productModel = {
//     getAll: (callback) => {
//         const query = 'SELECT * FROM products';
//         db.query(query, callback);
//     },
//     create: (name, description, price, image, stock_quantity, created_at, updated_at, callback) => {
//         const query = 'INSERT INTO products (name, description, price, imageUrl, stock, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
//         db.query(query, [name, description, price, image, stock_quantity, created_at, updated_at], callback);
//     }
// };
//
// module.exports = productModel;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define(
    'products',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
        },
        stock_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
{
    tableName: 'products',
    timestamps: true,
    underscored: true,
    }
)