const express = require('express');
const router = express.Router();
const {createProduct, archiveProduct} = require("../controllers/stripeController")

router.post("/create", createProduct);  
router.post("/archive", archiveProduct)

module.exports = router;