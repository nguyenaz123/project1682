const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, "Please specify the user ID"],
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: [true, "Please specify the product ID"],
            },
            quantity: {
                type: Number,
                required: [true, "Please specify the quantity"],
                min: [1, "Quantity must be at least 1"],
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Cart", cartSchema);
