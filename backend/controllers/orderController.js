const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


//Create Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    order,
  })

})


// Get Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (!order) {
    return next(new ErrorHandler("Order not found",404))
  }
  res.status(200).json({
    success: true,
    order,
  })

})

// Get user Order
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({user: req.user._id});
  res.status(200).json({
    success: true,
    orders,
  })

})


//Get all orders --Admin

exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;

  orders.forEach((orders) => {
    totalAmount += orders.totalPrice;
  })
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  })
})


//update order --Admin

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
    if (!order) {
    return next(new ErrorHandler("Order not found"));
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Your product has already been delivered", 400));
  }

  order.orderItems.forEach(async order => {
    await updateStock(order.product, order.quantity);
  })

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }
  await order.save({validateBeforeSave: false});
  res.status(200).json({
    success: true,
  })
})

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}




//delete orders --Admin

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found"));
  }
  order.deleteOne()
  res.status(200).json({
    success: true,
  })
})