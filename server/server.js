const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const db = require("../server/config/database");
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const orderItemRoutes = require('./routes/orderItem');
const cartRoutes = require('./routes/cart');
const stripeRoutes = require('./routes/stripe')
const emailRoutes = require('./mail/email');
const guestRoutes = require('./routes/userGuest');

const adminAuthentication = require('./middleware/adminMiddleware')
const adminRoutes = require('./routes/admin')

const sequelize = require('./config/database');
const cookieParser = require('cookie-parser')

require('dotenv').config();

const app = express();

// db.connect();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',  // Allow frontend domain
    credentials: true,  // Allow cookies & authentication headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true"); // Ensure cookies are allowed
    next();
});

app.use((req, res, next) => {
    console.log(`📩 Incoming Request: ${req.method} ${req.url}`);
    console.log("Cookies:", req.cookies);
    next();
});

app.use(express.json());
app.use(cookieParser());

// Only apply the bodyParser.json if it is not the Stripe webhook route as the Stripe webhook needs the raw
// body for verification
app.use((request, response, next)=>{
    // If route is Stripe webook do not apply bodyParser
    if (request.path == "/stripe/webhook"){
        next()
    }
    else{
        bodyParser.json()(request, response, next)
    }
})

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,   // Client ID from Google Developer Console
    process.env.CLIENT_SECRET, // Client secret from Google Developer Console
    'http://localhost:3000/oauth2callback'  // This should match your registered redirect URI
);

const scopes = ['https://mail.google.com/'];

// Route to initiate OAuth2
app.get('/auth', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    });
    res.redirect(url);
});

// Routes
app.use('/user', userRoutes);
app.use('/guest', guestRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/orderItems', orderItemRoutes);
app.use('/cart', cartRoutes);
app.use('/stripe', stripeRoutes);
app.use('/admin', adminAuthentication, adminRoutes);
app.use("/api", emailRoutes);


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
// connectDB();
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
