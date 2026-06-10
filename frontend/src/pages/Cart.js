import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Cart({ cartItems, setCartItems }) {

    const [loading, setLoading] = useState(false);

    // Increase Quantity
    const increaseQty = (id) => {
        const updatedCart = cartItems.map(item => {

            if (item.product._id === id) {

                if (item.qty >= item.product.stock) {
                    return item;
                }

                return {
                    ...item,
                    qty: item.qty + 1
                };
            }

            return item;
        });

        setCartItems(updatedCart);
    };

    // Decrease Quantity
    const decreaseQty = (id) => {
        const updatedCart = cartItems.map(item => {

            if (item.product._id === id) {
                return {
                    ...item,
                    qty: item.qty > 1 ? item.qty - 1 : 1
                };
            }

            return item;
        });

        setCartItems(updatedCart);
    };

    // Delete Item
    const deleteCartItem = (id) => {
        const updatedCart = cartItems.filter(
            item => item.product._id !== id
        );

        setCartItems(updatedCart);
    };

    // Total Units
    const totalUnits = cartItems.reduce(
        (acc, item) => acc + item.qty,
        0
    );

    // Total Amount
    const totalAmount = cartItems.reduce(
        (acc, item) => acc + (item.product.price * item.qty),
        0
    );

    // Place Order
    const placeOrder = async () => {

        try {

            setLoading(true);

            const orderData = {
                orderItems: cartItems.map(item => ({
                    product: item.product._id,
                    name: item.product.name,
                    price: item.product.price,
                    quantity: item.qty,
                    image:
                        item.product.images?.[0]?.url ||
                        item.product.images?.[0]?.image
                })),
                totalAmount
            };

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/order`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                }
            );

            const data = await response.json();

            if (response.ok) {

                alert('Your order has been placed successfully!');

                // Clear Cart
                setCartItems([]);

            } else {

                alert(data.message || 'Failed to place order');

            }

        } catch (error) {

            console.error(error);
            alert('Something went wrong while placing order');

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="container container-fluid">

            <h2 className="mt-5">
                Your Cart: <b>{totalUnits} Item(s)</b>
            </h2>

            <div className="row d-flex justify-content-between">

                {/* Cart Items */}
                <div className="col-12 col-lg-8">

                    {cartItems.length === 0 ? (
                        <h4 className="mt-4">Your cart is empty</h4>
                    ) : (

                        cartItems.map(item => (

                            <div key={item.product._id}>

                                <hr />

                                <div className="cart-item">

                                    <div className="row">

                                        {/* Product Image */}
                                        <div className="col-4 col-lg-3">

                                            <Link
                                                to={`/product/${item.product._id}`}
                                            >
                                                <img
                                                    src={
                                                        item.product.images?.[0]?.url ||
                                                        item.product.images?.[0]?.image
                                                    }
                                                    alt={item.product.name}
                                                    height="90"
                                                    width="115"
                                                />
                                            </Link>

                                        </div>

                                        {/* Product Name */}
                                        <div className="col-5 col-lg-3">

                                            <Link
                                                to={`/product/${item.product._id}`}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'black'
                                                }}
                                            >
                                                {item.product.name}
                                            </Link>

                                        </div>

                                        {/* Product Price */}
                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">

                                            <p id="card_item_price">
                                                ${item.product.price}
                                            </p>

                                        </div>

                                        {/* Quantity */}
                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">

                                            <div className="stockCounter d-inline">

                                                <span
                                                    className="btn btn-danger minus"
                                                    onClick={() =>
                                                        decreaseQty(item.product._id)
                                                    }
                                                >
                                                    -
                                                </span>

                                                <input
                                                    type="number"
                                                    className="form-control count d-inline"
                                                    value={item.qty}
                                                    readOnly
                                                />

                                                <span
                                                    className="btn btn-primary plus"
                                                    onClick={() =>
                                                        increaseQty(item.product._id)
                                                    }
                                                >
                                                    +
                                                </span>

                                            </div>

                                            <div className="mt-2">
                                                <small>
                                                    Stock Available: {item.product.stock}
                                                </small>
                                            </div>

                                        </div>

                                        {/* Delete */}
                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">

                                            <i
                                                className="fa fa-trash btn btn-danger"
                                                onClick={() =>
                                                    deleteCartItem(item.product._id)
                                                }
                                            ></i>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))

                    )}

                </div>

                {/* Order Summary */}
                <div className="col-12 col-lg-3 my-4">

                    <div id="order_summary">

                        <h4>Order Summary</h4>

                        <hr />

                        <p>
                            Subtotal:
                            <span className="order-summary-values">
                                {' '}
                                {totalUnits} Unit(s)
                            </span>
                        </p>

                        <p>
                            Est. Total:
                            <span className="order-summary-values">
                                {' '}
                                ${totalAmount.toFixed(2)}
                            </span>
                        </p>

                        <hr />

                        <button
                            id="checkout_btn"
                            className="btn btn-primary btn-block"
                            disabled={
                                cartItems.length === 0 || loading
                            }
                            onClick={placeOrder}
                        >
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}