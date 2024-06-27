import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import NavigationBar from './components/Navbar';
import './App.css'

const App = () => {
  const [products, setProducts] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div>
        <NavigationBar onSearch={handleSearch} />
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<ProductList products={products} searchQuery={searchQuery} />} />
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
