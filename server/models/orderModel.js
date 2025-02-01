// const db = require('../config/database');
//
// const orderModel = {
//     create: (id, userId, total_price, status, created_at, updated_at, callback) => {
//         const query = 'INSERT INTO orders (id, userId, total_price, status) VALUES (?, ?, ?, ?)';
//         db.query(query, [id, userId, total_price, status], callback);
//     },
//     getByUserId: (id, callback) => {
//         const query = 'SELECT * FROM orders WHERE userId = ?';
//         db.query(query, [id], callback);
//     }
// };
//
// module.exports = orderModel;

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
