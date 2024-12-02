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
    taxPrice,
    totalPrice
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    taxPrice,
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


// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});


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
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    // Kiểm tra xem sản phẩm còn tồn tại không trước khi cập nhật stock
    try {
      for (const item of order.orderItems) {
        await updateStock(item.product, item.quantity);
      }
    } catch (error) {
      return next(new ErrorHandler("One or more products in this order no longer exist in the database. Cannot update stock.", 400));
    }
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }

  product.Stock -= quantity;
  await product.save({ validateBeforeSave: false });
}



//delete orders --Admin

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found"));
  }
  await order.deleteOne()
  res.status(200).json({
    success: true,
  })
})
