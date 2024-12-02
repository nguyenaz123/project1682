const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: {
      company:"Ecommerce"
    }
  });
  res.status(200).json({success: true, client_secret: myPayment.client_secret})
})


exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({stripeApiKey: process.env.STRIPE_API_KEY});
})



exports.getLatestPayment = catchAsyncErrors(async (req, res, next) => {
  try {
    // Lấy danh sách payment intents, giới hạn 1 kết quả
    const payments = await stripe.paymentIntents.list({
      limit: 1,
      created: {
        lt: Math.floor(Date.now() / 1000)
      }
    });

    if (payments.data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No payment found"
      });
    }

    const latestPayment = payments.data[0];

    res.status(200).json({
      success: true,
      payment: {
        id: latestPayment.id,
        amount: latestPayment.amount,
        currency: latestPayment.currency,
        status: latestPayment.status,
        created: latestPayment.created,
        payment_method_types: latestPayment.payment_method_types,
        metadata: latestPayment.metadata
      }
    });
  } catch (error) {
    console.error('Stripe API Error:', error);
    return res.status(500).json({
      success: false,
      message: "Error fetching payment information",
      error: error.message
    });
  }
});