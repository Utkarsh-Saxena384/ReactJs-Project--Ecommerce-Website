import React, { useContext, useState } from 'react';
import { Navbar, Nav, Button, Container, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaSearch } from 'react-icons/fa';
import './Navbar.css'

const NavigationBar = ({ onSearch }) => {
    const { cartItems } = useContext(CartContext);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">E-Commerce</Navbar.Brand>
                <div className='d-flex align-items-center'>
                    <Form className='d-flex' inline onSubmit={handleSearch}>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button type="submit" variant="dark" className='filter-btn'><FaSearch /></Button>
                    </Form>
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/cart">Cart {cartItems && cartItems.length > 0 ? `(${cartItems.length})` : '(0)'}</Nav.Link>
                    </Nav>
                </div>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
