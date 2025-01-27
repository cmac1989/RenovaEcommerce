const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

class StripePrice{

    constructor(id, unitAmount, productId, active){
        this.id = id
        this.unitAmount = unitAmount
        this.productId = productId
        this.active = active
    }

    static async create(unitAmount, productId){
        try{

            // Create stripe price object
            const price = await stripe.prices.create({
                // TODO: Add support for multiple currencies 
                currency: "cad",
                unit_amount: unitAmount * 100, // Convert price from dollars to cents
                product: productId
            })

            return new StripePrice(price.id, unitAmount, productId, true)
        }
        catch (error){
            console.log(`Error in stripePriceModel.js function create: ${error.message}`)
        }
    }

    static async findById(id){
        try{

            // Get price object from stripe
            const price = await stripe.prices.retrieve(id);
            return new StripePrice(
                id, 
                price.unit_amount / 100, // Convert price from cents to dollars
                price.id,
                price.active
            )
        }
        catch (error){
            console.log(`Error in stripePriceModel.js function findById: ${error.message}`)
        }
    }
    
    // TODO: Be able to update currencies 
    async update(){
        try{

            // The only property which the api allows for updating is weather the price is active or not
            // Update active property of price
            await stripe.prices.update(
                this.id,
                {
                  active: this.active
                }
            )
        }
        catch (error){
            console.log(`Error in stripePriceModel.js function update: ${error.message}`)
        }
    }
}

module.exports = StripePrice