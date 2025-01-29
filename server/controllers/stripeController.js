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

/**
 * Updates product and products price on Stripe server.
 * @param {Object} request Express js request object.
 * @param {Object} response Express js response object.
 * @returns {void}
 */
exports.updateProductAndPrice = async (request, response) => {

    const {id, name, description, images, url, price} = request.body

    try{

        // Get product on Stripe server
        const stripeProduct = await StripeProduct.findById(id)

        // Get products price on Stripe server
        const stripePrice = stripeProduct.defaultPriceId ? await StripePrice.findById(stripeProduct.defaultPriceId) : null
                
        // If there is no price for product or price has changed
        if (stripePrice == null || stripePrice.unitAmount != price){

            // Create new Stripe price for product
            const newStripePrice = await StripePrice.create(price, stripeProduct.id)

            // Update Stripe product to have new price
            stripeProduct.defaultPriceId = newStripePrice.id
        }

        // Update product details
        stripeProduct.name = name
        stripeProduct.description = description
        stripeProduct.images = images
        stripeProduct.url = url
        await stripeProduct.update()

        // If there exists a price for product and price has been changed
        if (stripePrice !== null && stripePrice.unitAmount != price){
            
            // Archive old Stripe price as product has been given updated price
            stripePrice.active = false
            await stripePrice.update()
        }

        console.log("Product updated successfully on Stripe.")
        response.status(200).json({message: "Product updated successfully on Stripe."})
    } 
    catch (error){
        console.log(`Error in stripeController.js function updateProductAndPrice: ${error.message}`)
        response.status(500).json({error: error.message})
    }
}

/**
 * Archives product and products price on Stripe server so product is not available at checkout.
 * @param {Object} request Express js request object.
 * @param {Object} response Express js response object.
 * @returns {void}
 */
exports.archiveProductAndPrice = async (request, response) => {

    const {id} = request.body

    try{

        // Get product on Stripe server
        const stripeProduct = await StripeProduct.findById(id)

        // Get products price on Stripe server
        const stripePrice = stripeProduct.defaultPriceId ? await StripePrice.findById(stripeProduct.defaultPriceId) : null

        // Archive product
        stripeProduct.active = false
        await stripeProduct.update()

        // If there is a price for product
        if (stripePrice !== null){

            // Archive products Stripe price
            stripePrice.active = false
            await stripePrice.update()
        }

        console.log("Product archived successfully on Stripe.")
        response.status(200).json({message: "Product archived successfully on Stripe."})
    } 
    catch (error){
        console.log(`Error in stripeController.js function archiveProductAndPrice: ${error.message}`)
        response.status(500).json({error: error.message})
    }
}







