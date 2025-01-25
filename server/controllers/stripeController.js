const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// Function creates Stripe product and gives the product a Stripe price
exports.createProduct = async (request, response) => {

    const {name, description, id, price} = request.body

    try{
        // Create Stripe product
        // TODO: Add images, and url for product
        const stripeProduct = await stripe.products.create({
            name: name,
            description: description,
            id: id,
        })

        // Create Stripe price object for product
        const stripePrice = await stripe.prices.create({
            currency: "cad",
            unit_amount: price * 100, // Convert price from dollars to cents
            product: id
        })
    } 
    catch (error){
        console.log(`Error in stripeController.js ${error.message}`)
        return response.status(500).json({error: error.message})
    }

    console.log("Product added successfully to Stripe.")
    return response.status(200).json({message: "Product added successfully to Stripe."})
}


