const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("../server/config/database");
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const orderItemRoutes = require('./routes/orderItem');
const cartRoutes = require('./routes/cart');
const sequelize = require('./config/database');

require('dotenv').config();

const app = express();

// db.connect();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

// Routes
app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/orderItems', orderItemRoutes);
app.use('/cart', cartRoutes);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('successfully connect to the DB')
        await sequelize.sync();
        console.log('All models synced')
    } catch(error) {
        console.error('error connecting to the DB', error);
    }
}

// Global error handler for unknown routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
