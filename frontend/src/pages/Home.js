import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    useEffect(() => {
        fetch('https://react-mini-ecommerce.onrender.com/api/v1/products?keyword=' + keyword)
            .then(res => res.json())
            .then(res => setProducts(res.products))
    }, [keyword])

    return (
        <div className="container container-fluid">
            <h1 className="text-center">Latest Products</h1>
            <div className="row">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}