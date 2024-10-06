import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';  // Import the Redux store
import Login from './pages/LoginPage';
import Signup from './pages/SignUpPage';
import ProductList from './pages/ProductListPage';
import Checkout from './pages/CheckoutPage';
import OrderSummary from './pages/OrderSummary';
import Navbar from './components/NavBar';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import { useLocation } from 'react-router-dom';


import LoginWrapper from './components/LoginWrapper';
import UserList from './pages/AdminDashboard';


const App = () => {
   // Get the navigate function from react-router-dom
 
    const { isLoggedIn } = useSelector((state) => state.auth);
    const [cart, setCart] = useState([]); // State to hold cart items
    const hideNavbarRoutes = ['/login', '/signup'];

    const token = localStorage.getItem('token')

    // Function to handle adding a product to the cart
    // const onAddToCart = (product) => {
    //     const existingProduct = cart.find(item => item.id === product.id);
    //     if (existingProduct) {
    //         setCart(cart.map(item => 
    //             item.id === product.id 
    //             ? { ...item, quantity: item.quantity + 1 } 
    //             : item
    //         ));
    //     } else {
    //         setCart([...cart, { ...product, quantity: 1 }]);
    //     }
    // };

    // Function to handle login
  

    return (
        <Provider store={store}>
            <Router>
            
           <Navbar cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />
                <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<LoginWrapper />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<ProductList cart={cart} setCart={setCart} />} />
                <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
                <Route path="/admin" element={<UserList/>} />
                
                <Route path="/place-order" element={token ? <PlaceOrder cart={cart} />:<LoginWrapper/>} />
                    {/* Protected routes */}
                    <Route path="/checkout" element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />} />
                    <Route path="/order-summary" element={isLoggedIn ? <OrderSummary /> : <Navigate to="/login" />} />
                    {/* Fallback route for 404 */}
                    <Route path="*" element={<h1>404: Page not found</h1>} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
