const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// Function creates Stripe product and gives the product a Stripe price
exports.createProduct = async (request, response) => {

    const {name, description, id, price} = request.body

    try{
        // Create Stripe product
        // TODO: Add images, and url for product
        await stripe.products.create({
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

        // Update product object to point to its price object
        await stripe.products.update(
            id,
            {
              default_price: stripePrice.id
            }
        )
    } 
    catch (error){
        console.log(`Error in stripeController.js function createProduct: ${error.message}`)
        return response.status(500).json({error: error.message})
    }

    console.log("Product added successfully to Stripe.")
    return response.status(200).json({message: "Product added successfully to Stripe."})
}

// Function archives Stripe product and its Stripe price
exports.archiveProduct = async (request, response) => {

    const {id} = request.body

    try{

        // Get product from Stripe
        const product = await stripe.products.retrieve(id)

        // Archive product and products price
        await stripe.products.update(
            id,
            {
              active: false
            }
        )
        await stripe.prices.update(
            product.default_price,
            {
                active: false
            }
        )
    }
    catch (error){
        console.log(`Error in stripeController.js function archiveProduct: ${error.message}`)
        return response.status(500).json({error: error.message})
    }
    
    console.log("Product successfully archived.")
    return response.status(200).json({message: "Product successfully archived."})
}

// Function updates product name, description, and price
// TODO: Be able to update product images and url
exports.updateProduct = async (request, response) => {

    // Any values which are null will not be updated
    const {id, name, description, price} = request.body

    try{

        // Get product from Stripe
        const product = await stripe.products.retrieve(id)

        // If price is to be updated create new Stripe price object for product
        let stripePrice = null
        if (price){
            stripePrice = await stripe.prices.create({
                currency: "cad",
                unit_amount: price * 100, // Convert price from dollars to cents
                product: id
            })
        }

        // Update product
        await stripe.products.update(
            id,
            // For null values just use current product values
            {
                name: name ? name : product.name,
                description: description ? description : product.description,
                default_price: price ? stripePrice.id : product.default_price
            }
        )

        // If price was changed archive the old price object as we now have a new product default_price
        if (price){
            await stripe.prices.update(
                product.default_price,
                {
                    active: false
                }
            )
        }    
    }
    catch (error){
        console.log(`Error in stripeController.js function updateProduct: ${error.message}`)
        return response.status(500).json({error: error.message})
    }

    console.log("Product successfully updated.")
    return response.status(200).json({message: "Product successfully updated."})
}
