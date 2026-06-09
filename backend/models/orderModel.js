const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

    cartItems: Array,

    amount: Number,

    status: {
        type: String,
        default: 'pending'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const orderModel = mongoose.model('Order', orderSchema);

module.exports = orderModel;