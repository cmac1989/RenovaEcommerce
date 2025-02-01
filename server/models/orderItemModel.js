// const db = require('../config/database');
//
// const orderItemModel = {
//     create: (id, orderId, quantity, price_at_purchase, created_at, callback) => {
//         const query = 'INSERT INTO orders (id, orderId, quantity, price_at_purchase, created_at) VALUES (?, ?, ?, ?, ?)';
//         db.query(query, [id, orderId, quantity, price_at_purchase, created_at], callback);
//     },
//     getAll: (callback) => {
//         const query = 'SELECT * FROM orders_items';
//         db.query(query, callback);
//     },
//     getByUserId: (id, callback) => {
//         const query = 'SELECT * FROM orders WHERE userId = ?';
//         db.query(query, [id], callback);
//     }
// };
//
// module.exports = orderItemModel;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderItem = sequelize.define('orderItem',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            foreignKey: 'order_id',
        },
        product_id: {
            type: DataTypes.INTEGER,
            foreignKey: 'product_id',
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price_at_purchase: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
        }
    },
{
    tableName: 'order_items',
    }
)

module.exports = OrderItem;