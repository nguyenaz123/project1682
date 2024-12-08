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



exports.refundPayment = catchAsyncErrors(async (req, res, next) => {
  const { paymentIntentId } = req.body;

  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      reason: 'requested_by_customer'
    });

    res.status(200).json({
      success: true,
      refund
    });
  } catch (error) {
    return next(new Error(`Refund failed: ${error.message}`));
  }
});
