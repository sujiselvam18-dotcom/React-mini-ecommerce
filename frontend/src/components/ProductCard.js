import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
    const imageUrl = product.images && product.images[0]
        ? (product.images[0].url || product.images[0].image)
        : '';

    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    src={imageUrl}
                    alt={product.name}
                />
                <div className="card-body ps-3 d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>
                            {product.name}
                        </Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner"
                                style={{ width: `${(product.ratings / 5) * 100}%` }}>
                            </div>
                        </div>
                        <span>{product.numOfReviews} Reviews</span>
                    </div>
                    <p className="card-text">${product.price}</p>
                    <Link
                        to={`/product/${product._id}`}
                        className="btn btn-block"
                        style={{
                            backgroundColor: '#e77600',
                            color: 'white',
                            padding: '8px',
                            textAlign: 'center',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            display: 'block'
                        }}
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}