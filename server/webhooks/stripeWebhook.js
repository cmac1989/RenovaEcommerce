const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.webhook = (request, response) => {
    
    let event = request.body
  
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];

    // Verify
    try {
        event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.log(`⚠️  Webhook signature verification failed.`, error.message);
        return response.sendStatus(400);
    }

    console.log(event.type)
    
    
};


  