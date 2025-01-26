const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

class StripePrice{

    constructor(id, unitAmount, productId){
        this.id = id
        this.unitAmount = unitAmount
        this.productId = productId
        this.active = true
    }

    static async create(unitAmount, productId){
        try{

            // Create stripe price object
            const price = await stripe.prices.create({
                currency: "cad",
                unit_amount: unitAmount * 100, // Convert price from dollars to cents
                product: productId
            })

            return new StripePrice(price.id, unitAmount, productId)
        }
        catch (error){
            console.log(`Error in stripePriceModel.js function create: ${error.message}`)
        }
    }
}

module.exports = StripePrice