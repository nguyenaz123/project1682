const express = require('express');
const {
    addItemToCart,
    getCartByUserId,
    updateCartItem,
    removeItemFromCart,
    clearCart
} = require('../controllers/cartController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

// Thêm sản phẩm vào giỏ hàng
router.route('/cart').post(isAuthenticatedUser, addItemToCart);

// Lấy giỏ hàng của người dùng
router.route('/cart/:userId').get(isAuthenticatedUser, getCartByUserId);

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.route('/cart/item').put(isAuthenticatedUser, updateCartItem);

// Xóa sản phẩm khỏi giỏ hàng
router.route('/cart/item').delete(isAuthenticatedUser, removeItemFromCart);

// Xóa toàn bộ giỏ hàng
router.route('/cart/clear/:userId').delete(isAuthenticatedUser, clearCart);

module.exports = router;
