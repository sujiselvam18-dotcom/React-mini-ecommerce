const orderModel = require('../models/orderModel');
const productModel = require('../models/productModels');

exports.createOrder = async (req, res) => {

    try {

        const { orderItems, totalAmount } = req.body;

        for (const item of orderItems) {

            const product = await productModel.findById(
                item.product
            );

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name} is out of stock`
                });
            }

            product.stock =
                Number(product.stock) - Number(item.quantity);

            await product.save();
        }

        const order = await orderModel.create({
            cartItems: orderItems,
            amount: totalAmount,
            status: 'pending',
            createdAt: new Date()
        });

        res.status(200).json({
            success: true,
            message: 'Your order has been placed successfully',
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};