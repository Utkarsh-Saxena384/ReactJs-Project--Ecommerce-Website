import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Badge, Container } from 'react-bootstrap';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import { CartContext } from './context/CartContext';

const App = () => {
  const [products, setProducts] = useState([]);
  const { cartItems } = useContext(CartContext);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching the products:', error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">E-Commerce</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/cart">Cart {cartItems && cartItems.length > 0 ? `(${cartItems.length})` : '(0)'}</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<ProductList products={products} />} />
            <Route path="/product/:id" element={<ProductDetail products={products} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Container>
      </div>
      <div className='mt-4'>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
