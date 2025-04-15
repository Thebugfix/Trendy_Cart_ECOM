const stripe = require('../../config/stripe');
const addToCartModel = require('../../models/cartProduct');
const OrderModel = require('../../models/orderProductModel');

const endpointScecret = process.env.STRIPE_ENDPOINT_SECRET;

async function getLineItems(lineItems) {
    let ProductItems = [];

    if (lineItems?.data?.length) {
        for (const item of lineItems.data) {
            const product = await stripe.products.retrieve(item.price.product);
            const productId = product.metadata.productId;

            const productData = {
                productId: productId,
                productName: product.name,
                productPrice: item.price.unit_amount / 100,
                quantity: item.quantity,
                productImage: product.images
            };
            ProductItems.push(productData);

        }
    }
    return ProductItems;
}


const webhooks = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    const payloadString = JSON.stringify(req.body);

    const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secrect: endpointScecret,
    });

    let event;
    try {
        event = stripe.webhooks.constructEvent(payloadString, header, endpointScecret);
    } catch (err) {
        console.log('Error:', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    // handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
            const productDetails = await getLineItems(lineItems);

            const orderDetails ={
                productDetails: ProductItems,
                email: session.customer_email,
                userId: session.metadata.userId,
                paymentDetails: {
                    paymentId: session.payment_intent,
                    payment_method_type: session.payment_method_types,
                    payment_status: session.payment_status
                },
                shipping_options: session.shipping_options.map(s=>{
                    return{
                        ...s,
                        shipping_amount: s.amount_total / 100
                    }
                }),
                totalAmount: session.amount_total / 100
            }

            const order = new OrderModel(orderDetails);
            const savedOrder = await order.save();

            if(savedOrder?._id){
                const deleteCartItems = await addToCartModel.deleteMany({userId: session.metadata.userId});
            }

            break;
        // Add more event types as needed
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).send();
}

module.exports = webhooks;