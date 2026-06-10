import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function App() {
    const [cartItems, setCartItems] = useState([]);

    return (
        <div className="App">
            <Router>

                <Header cartItems={cartItems} />

                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/search"
                        element={<Home />}
                    />

                    <Route
                        path="/product/:id"
                        element={
                            <ProductDetail
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                            />
                        }
                    />

                    <Route
                        path="/cart"
                        element={
                            <Cart
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                            />
                        }
                    />

                </Routes>

                <Footer />

            </Router>
        </div>
    );
}

export default App;
