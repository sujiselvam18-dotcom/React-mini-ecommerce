import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetail({ cartItems, setCartItems }) {

    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);

    const { id } = useParams();

    useEffect(() => {
        fetch(`https://react-mini-ecommerce.onrender.com/api/v1/product/${id}`)
            .then(res => res.json())
            .then(res => {
                if (res.product) {
                    setProduct(res.product);
                }
            })
            .catch(err => console.log(err));
    }, [id]);

    const increaseQty = () => {
        if (qty >= product.stock) return;
        setQty(prev => prev + 1);
    };

    const decreaseQty = () => {
        if (qty <= 1) return;
        setQty(prev => prev - 1);
    };

    const addToCart = () => {

        const itemExist = cartItems.find(
            item => item.product._id === product._id
        );

        if (itemExist) {

            const updatedCart = cartItems.map(item => {

                if (item.product._id === product._id) {

                    const newQty = item.qty + qty;

                    return {
                        ...item,
                        qty: newQty > product.stock
                            ? product.stock
                            : newQty
                    };
                }

                return item;
            });

            setCartItems(updatedCart);
            alert('Cart quantity updated successfully!');
        }
        else {

            const newItem = {
                product,
                qty
            };

            setCartItems(prev => [...prev, newItem]);
            alert('Product added to cart successfully!');
        }
    };

    if (!product) {
        return (
            <div className="text-center mt-5">
                Loading...
            </div>
        );
    }

    return (
        <div className="container container-fluid">

            <div className="row f-flex justify-content-around">

                <div
                    className="col-12 col-lg-5 img-fluid"
                    id="product_image"
                >
                    <img
                        src={
                            product.images?.[0]?.url ||
                            product.images?.[0]?.image
                        }
                        alt={product.name}
                        height="500"
                        width="500"
                    />
                </div>

                <div className="col-12 col-lg-5 mt-5">

                    <h3>{product.name}</h3>

                    <p id="product_id">
                        Product # {product._id}
                    </p>

                    <hr />

                    <div className="rating-outer">
                        <div
                            className="rating-inner"
                            style={{
                                width: `${(product.ratings / 5) * 100}%`
                            }}
                        ></div>
                    </div>

                    <hr />

                    <p id="product_price">
                        ${product.price}
                    </p>

                    <div className="stockCounter d-inline">

                        <span
                            className="btn btn-danger minus"
                            onClick={decreaseQty}
                        >
                            -
                        </span>

                        <input
                            type="number"
                            className="form-control count d-inline"
                            value={qty}
                            readOnly
                        />

                        <span
                            className="btn btn-primary plus"
                            onClick={increaseQty}
                        >
                            +
                        </span>

                    </div>

                    <button
                        type="button"
                        id="cart_btn"
                        className="btn btn-primary d-inline ml-4"
                        onClick={addToCart}
                        disabled={product.stock === 0}
                    >
                        Add to Cart
                    </button>

                    <hr />

                    <p>
                        Status:
                        <span
                            className={
                                product.stock > 0
                                    ? 'text-success'
                                    : 'text-danger'
                            }
                        >
                            {product.stock > 0
                                ? ' In Stock'
                                : ' Out of Stock'}
                        </span>
                    </p>

                    <hr />

                    <h4 className="mt-2">
                        Description:
                    </h4>

                    <p>{product.description}</p>

                    <hr />

                    <p
                        id="product_seller"
                        className="mb-3"
                    >
                        Sold by:
                        <strong> {product.seller}</strong>
                    </p>

                </div>

            </div>

        </div>
    );
}