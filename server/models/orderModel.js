const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('order',
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
        total_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(
                'pending',
                'completed',
                'canceled',
                'shipped'
            ),
            allowNull: false,
        },
    },
    {
        tableName: 'orders',
        timestamps: true,
        underscored: true,
    }
);

module.exports = Order;
