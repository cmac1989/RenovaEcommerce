const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// Create basic product
exports.createProduct = async (req, res) => {
    const product = await stripe.products.create({
        name: "Test product",
    });
    console.log(product)
}


