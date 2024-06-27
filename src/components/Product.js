import React, { useContext, useState, useEffect } from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Product.css';
import axios from 'axios';

const Product = ({ product }) => {
    const { cartItems, addToCart, updateCartItemQuantity } = useCart();
    const itemInCart = cartItems.find(item => item.id === product.id);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [quantity, setQuantity] = useState(1);

    const cartItem = cartItems.find(item => item.product.id === product.id);

    const handleViewDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://fakestoreapi.com/products/${product.id}`);
            setLoading(false);
            navigate(`/product/${product.id}`, { state: { product: response.data } });
        } catch (error) {
            setLoading(false);
            console.error('Error fetching product details:', error);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    const handleIncrement = () => {
        updateCartItemQuantity(product.id, cartItem.quantity + 1);
    };

    const handleDecrement = () => {
        if (cartItem.quantity > 1) {
            updateCartItemQuantity(product.id, cartItem.quantity - 1);
        } else {
            updateCartItemQuantity(product.id, 0);
        }
    };

    return (
        <Card className="product-card">
            <div className="image-container">
                <Card.Img variant="top" src={product.image} alt={product.title} />
            </div>
            <Card.Body className="d-flex flex-column">
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="category">{product.category}</Card.Text>
                <Card.Text className="price">Price: ${product.price}</Card.Text>
                <Card.Text className="rating">
                    Rating: {product.rating.rate} ({product.rating.count} reviews)
                </Card.Text>
                <Card.Text className="description">{product.description}</Card.Text>
                <div className='d-flex justify-content-between'>
                    <Button variant="primary" onClick={handleViewDetails} disabled={loading}>
                        {loading ? 'Please Wait...' : 'View Details'}
                    </Button>
                    {!cartItem ? (
                        <>
                            <Button variant="success" onClick={handleAddToCart} disabled={loading}>
                                {loading ? 'Adding...' : 'Add to Cart'}
                            </Button>
                        </>
                    ) : (
                        <ButtonGroup>
                            <Button variant="outline-danger" onClick={handleDecrement}>-</Button>
                            <Button variant="outline-secondary" disabled>{cartItem.quantity}</Button>
                            <Button variant="outline-success" onClick={handleIncrement}>+</Button>
                        </ButtonGroup>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Product;
