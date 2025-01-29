const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const StripeProduct = require("../models/stripeProductModel")
const StripePrice = require("../models/stripePriceModel")


/**
 * Creates product with price on Stripe server.
 * @param {Object} request Express js request object.
 * @param {Object} response Express js response object.
 * @returns {void}
 */
exports.createProductWithPrice = async (request, response) => {

    const {id, name, description, images, url, price} = request.body

    try{

        // Create product on Stripe server
        const stripeProduct = await StripeProduct.create(id, name, description, images, url)

        // Create price on Stripe server for product
        const stripePrice = await StripePrice.create(price, stripeProduct.id)

        // Set the price of product
        stripeProduct.defaultPriceId = stripePrice.id
        await stripeProduct.update()

        console.log("Product with price added successfully to Stripe.")
        response.status(200).json({message: "Product with price added successfully to Stripe."})
    } 
    catch (error){
        console.log(`Error in stripeController.js function createProductWithPrice: ${error.message}`)
        response.status(500).json({error: error.message})
    }
}



