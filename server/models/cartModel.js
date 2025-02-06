const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');
const Product = require('./productModel');

const Cart = sequelize.define('cart',
        {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            foreignKey: 'user_id',
        },
        guest_user_id: {
            type: DataTypes.INTEGER,
            foreignKey: 'guest_user_id',
        },
        product_variant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: 'product_id',
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        },
        {
            tableName: 'cart_items',
            timestamps: true,
            underscored: true,
        }
    )
Cart.belongsTo(User, {foreignKey: 'user_id', as: 'user'})
Cart.belongsTo(Product, {foreignKey: 'product_id', as: 'product'})

module.exports = Cart;

