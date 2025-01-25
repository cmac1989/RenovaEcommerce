const express = require('express');
const router = express.Router();
const {createProduct, archiveProduct, updateProduct} = require("../controllers/stripeController")

router.post("/create", createProduct);  
router.post("/archive", archiveProduct)
router.post("/update", updateProduct)

module.exports = router;