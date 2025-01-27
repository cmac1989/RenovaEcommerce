const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const StripePrice = require("./stripePriceModel")

class StripeProduct{

    #id
    #name
    #description
    #images
    #url
    #price
    #stripePrice
    #active
    #priceChange

    constructor(id, name, description, images, url, price, stripePrice, active){
        this.#id = id
        this.#name = name
        this.#description = description
        this.#images = images
        this.#url = url
        this.#price = price
        this.#stripePrice = stripePrice
        this.#active = active

        // Flag to check if the price of the product was changed, this way when product updates we only have to 
        // create a new stripe price object if the price was changed
        this.#priceChange = false
    }

    /**
     * Creates a product on the Stripe server that will be available at checkout sessions. All details 
     * given will be displayed to customer at checkout. (Except id)
     * @param {string} id Id of product.
     * @param {string} name Name of product.
     * @param {string} description Description of product.
     * @param {Array<string>} images Product image urls. (Up to 8 urls)
     * @param {string} url Url of webpage for product.
     * @param {number} price Price of product in dollars.
     * @returns {StripeProduct}
     */
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

            // Create Stripe price object for product
            const stripePrice = await StripePrice.create(price, id)

            // Update default price of product to id of Stripe price object
            await stripe.products.update(
                id,
                {
                  default_price: stripePrice.id
                }
            )

            return new StripeProduct(id, name, description, images, url, price, stripePrice, true)
        }
        catch (error){
            console.log(`Error in stripePriceModel.js function create: ${error.message}`)
        }
    }

    /**
     * Retrieves product from the Stripe server with specified id.
     * @param {string} id Id of product to retrieve.
     * @returns {StripeProduct}
     */
    static async findById(id){
        try{

            // Get product object and products price object 
            const product = await stripe.products.retrieve(id);
            const stripePrice = await StripePrice.findById(product.default_price)

            return new StripeProduct(
                product.id,
                product.name,
                product.description,
                product.images,
                product.url,
                stripePrice.unitAmount,
                stripePrice,
                product.active
            )
        }
        catch (error){
            console.log(`Error in stripeProductModel.js function findById: ${error.message}`)
        }
    }

    /**
     * Updates the product on the Stripe server to reflect the current properties of this instance.
     */
    async update(){
        try{

            // If the price of product has changed
            if (this.#priceChange){
                // Create new Stripe price object with updated price
                const newStripePrice = await StripePrice.create(this.#price, this.#id)
                
                // Update product
                await stripe.products.update(
                    this.#id,
                    {
                      name: this.#name,
                      description: this.#description,
                      images: this.#images,
                      url: this.#url,
                      active: this.#active,

                      // Default price is set to id of new Stripe price object
                      default_price: newStripePrice.id
                    }
                )

                // Archive the old Stripe price object
                this.#stripePrice.active = false
                this.#stripePrice.update()

                // Update products Stripe price object to new Stripe price object
                this.#stripePrice = newStripePrice

                this.#priceChange = false
            }
            else{

                // Update product
                await stripe.products.update(
                    this.#id,
                    {
                      name: this.#name,
                      description: this.#description,
                      images: this.#images,
                      url: this.#url,
                      active: this.#active,
                      default_price: this.#stripePrice.id
                    }
                )
            }
        }
        catch (error){
            console.log(`Error in stripeProductModel.js function update: ${error.message}`)
        }
    }
}

module.exports = StripeProduct