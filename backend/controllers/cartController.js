const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.addItemToCart = catchAsyncErrors(async (req, res, next) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    // Kiểm tra xem sản phẩm có tồn tại không
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
        const itemIndex = cart.products.findIndex(
            (item) => item.productId.toString() === productId
        );
        if (itemIndex > -1) {
            const newQuantity = cart.products[itemIndex].quantity + quantity;
            if (newQuantity > product.Stock) {
                return next(new ErrorHandler("Cannot exceed available stock", 400));
            }

            cart.products[itemIndex].quantity = newQuantity;
        } else {
            if (quantity > product.Stock) {
                return next(new ErrorHandler("Cannot exceed available stock", 400));
            }

            cart.products.push({ productId, quantity });
        }
    } else {
        // Nếu giỏ hàng chưa tồn tại
        if (quantity > product.Stock) {
            return next(new ErrorHandler("Cannot exceed available stock", 400));
        }

        cart = new Cart({
            userId,
            products: [{ productId, quantity }],
        });
    }

    await cart.save();

    const populatedCart = await Cart.findOne({ userId }).populate("products.productId");

    res.status(200).json({
        success: true,
        cart: populatedCart,
    });
});




exports.getCartByUserId = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user.id;
    let cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) {
        cart = {
            userId,
            products: [],
        };
    }
    res.status(200).json({
        success: true,
        cart,
    });
});


exports.updateCartItem = catchAsyncErrors(async (req, res, next) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Lấy userId từ req.user

    const cart = await Cart.findOne({ userId });
    if (!cart) {
        return next(new ErrorHandler("Cart not found", 404));
    }

    const itemIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1) {
        return next(new ErrorHandler("Product not found in cart", 404));
    }

    if (quantity > 0) {
        cart.products[itemIndex].quantity = quantity;
    } else {
        cart.products.splice(itemIndex, 1); // Xóa sản phẩm nếu quantity = 0
    }

    await cart.save();

    res.status(200).json({
        success: true,
        cart,
    });
});


exports.removeItemFromCart = catchAsyncErrors(async (req, res, next) => {
    const { productId } = req.body; // Chỉ cần productId từ request body
    const userId = req.user.id; // Lấy userId từ req.user

    // Tìm giỏ hàng của người dùng
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        return next(new ErrorHandler("Cart not found", 404));
    }

    // Loại bỏ sản phẩm khỏi giỏ hàng
    cart.products = cart.products.filter(item => item.productId.toString() !== productId);

    // Lưu giỏ hàng sau khi xóa sản phẩm
    await cart.save();

    // Populate giỏ hàng để trả về giống hàm getCartByUserId
    const updatedCart = await Cart.findOne({ userId }).populate("products.productId");

    res.status(200).json({
        success: true,
        cart: updatedCart, // Trả về giỏ hàng với thông tin đã populate
    });
});



exports.clearCart = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user.id; // Lấy userId từ req.user
    // Tìm giỏ hàng của người dùng
    const cart = await Cart.findOne({ userId });
    if (!cart) {
        return next(new ErrorHandler("Cart not found", 404));
    }
    // Làm trống giỏ hàng
    cart.products = [];
    await cart.save();

    res.status(200).json({
        success: true,
        message: "Cart cleared successfully",
    });
});
