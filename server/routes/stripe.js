const express = require('express');
const router = express.Router();
const {createProductWithPrice} = require("../controllers/stripeController")

router.post("/create-product-with-price", createProductWithPrice);  


module.exports = router;