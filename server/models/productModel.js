const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define(
    'Product',
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

module.exports = Product;