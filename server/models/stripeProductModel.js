const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const StripePrice = require("./stripePriceModel")

class StripeProduct{

    constructor(id, name, description, images, url, price, stripePriceId){
        this.id = id
        this.name = name
        this.description = description
        this.images = images
        this.url = url
        this.price = price
        this.stripePriceId = stripePriceId
        this.active = true
    }

    static async create(id, name, description, images, url, price){
        try{

            // Create Stripe product
            await stripe.products.create({
                id: id,
                name: name,
                description: description,
                images: images,
                url: url
            })

            // Create Stripe price for product
            const stripePrice = await StripePrice.create(price, id)

            // Update default price of product to stripe price
            await stripe.products.update(
                id,
                {
                  default_price: stripePrice.id
                }
            )

            return new StripeProduct(id, name, description, images, url, price, stripePrice.id)
        }
        catch (error){
            console.log(`Error in stripePriceModel.js function create: ${error.message}`)
        }
    }
}

module.exports = StripeProduct