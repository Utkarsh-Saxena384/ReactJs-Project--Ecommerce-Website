import React, { useContext, useState } from 'react';
import { Card, Container, Button, ButtonGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './ProjectDetail.css';

const ProductDetail = () => {
    const { cartItems, addToCart, updateCartItemQuantity } = useContext(CartContext);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const product = location.state.product;
    
    if (!product) {
        return <h2>Product not found</h2>;
    }

    const cartItem = cartItems.find(item => item.product.id === product.id);

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    const handleIncrement = () => {
        updateCartItemQuantity(product.id, cartItem.quantity + 1);
    };

    const handleDecrement = () => {
        if (product.quantity > 1) {
            updateCartItemQuantity(product.id, cartItem.quantity - 1);
        } else {
            updateCartItemQuantity(product.id, 0);
        }
    };

    return (
        <Container className="product-detail-container mt-4">
            <Card className="product-detail-card">
                <div className="img-container">
                    <Card.Img src={product.image} alt={product.name} className="product-image" />
                </div>
                <Card.Body>
                    <Card.Title className="product-name">{product.title}</Card.Title>
                    <div className="product-info">
                        <p><strong>Category:</strong> {product.category}</p>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <p><strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)</p>
                        <p><strong>Description:</strong> {product.description}</p>
                    </div>
                    <div className='d-flex justify-content-end'>
                        {!cartItem ? (
                            <>
                                <Button variant="success" onClick={handleAddToCart}>
                                    Add to Cart
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
        </Container>
    );
};

export default ProductDetail;
