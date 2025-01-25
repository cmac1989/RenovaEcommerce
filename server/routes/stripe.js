const express = require('express');
const router = express.Router();
const {createProduct} = require("../controllers/stripeController")

router.post('/create', createProduct);  

module.exports = router;