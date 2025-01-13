const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("../server/config/database");

require('dotenv').config();

const app = express();

db.connect();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// TODO Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
