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

        // Flag to check if the price of the product was changed, this way when product updates we only have to 
        // create a new stripe price object if the price was changed
        this.priceChange = false
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

    static async findById(id){
        try{

            // Get product object and products price object 
            const product = await stripe.products.retrieve(id);
            const price = await StripePrice.findById(product.default_price)

            return new StripeProduct(
                product.id,
                product.name,
                product.description,
                product.images,
                product.url,
                price.unitAmount,
                price.id
            )
        }
        catch (error){
            console.log(`Error in stripeProductModel.js function findById: ${error.message}`)
        }
    }
}

module.exports = StripeProduct