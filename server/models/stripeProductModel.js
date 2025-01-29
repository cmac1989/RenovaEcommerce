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

            // Validate price ahead of time as price object is created after product object
            if (price < 0 || price > 999999999999){
                throw new Error("Price must be between $0.00 and $999999999999.00")
            }

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
            console.log(`Error in stripeProductModel.js function create: ${error.message}`)
            throw new Error(error.message)
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
            throw new Error(error.message)
        }
    }

    /**
     * Updates the product on the Stripe server to reflect the current properties of this instance.
     * @returns {void}
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
            throw new Error(error.message)
        }
    }

    // Getters and setters
    get id(){
        return this.#active
    }
    set id(_){
        throw new Error("StripeProduct id cannot be modified.")
    }

    get name(){
        return this.#name
    }
    set name(newName){
        this.#name = newName
    }

    get description(){
        return this.#description
    }
    set description(newDescription){
        this.#description = newDescription
    }

    get images(){
        return this.#images
    }
    set images(newImages){
        // Must be of length at most 8
        if (newImages.length > 8){
            throw new Error("There can only be at most 8 image urls.")
        }
        this.#images = newImages
    }

    get url(){
        return this.#url
    }
    set url(newUrl){
        this.#url = newUrl
    }

    get price(){
        return this.#price
    }
    set price(newPrice){
        // If price is not in range
        if (price < 0 || price > 999999999999){
            throw new Error("price must be between 0 and 999999999999.")
        }
        
        // If price has changed
        if (this.#price != newPrice){
            this.#priceChange = true
            this.#price = newPrice
        }
    }

    get stripePrice(){
        return this.#stripePrice
    }
    set stripePrice(_){
        throw new Error("StripeProduct stripePrice object cannot be modified.")
    }

    get active(){
        return this.#active
    }
    set active(newActive){
        this.#active = newActive
    }

    get priceChange(){
        return this.#priceChange
    }
    set priceChange(_){
        throw new Error("StripeProduct priceChange cannot be modified.")
    }

}

module.exports = StripeProduct