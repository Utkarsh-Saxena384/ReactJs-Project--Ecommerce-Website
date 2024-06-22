import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import { Container, Row, Col, Button, Card, ListGroup, ButtonGroup } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleIncrement = (productId) => {
        const item = cartItems.find(item => item.product.id === productId);
        updateCartItemQuantity(productId, item.quantity + 1);
    };

    const handleDecrement = (productId) => {
        const item = cartItems.find(item => item.product.id === productId);
        if (item.quantity > 1) {
            updateCartItemQuantity(productId, item.quantity - 1);
        } else {
            removeFromCart(cartItems.indexOf(item));
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <Container className="mt-4 cart-container">
            <h2 className="text-center mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <h4 className="text-center">Your cart is empty</h4>
            ) : (
                <Row>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            {cartItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row className="align-items-center">
                                        <Col md={2}>
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="img-fluid rounded"
                                            />
                                        </Col>
                                        <Col md={3}>
                                            <h5>{item.product.name}</h5>
                                            <p>{item.product.category}</p>
                                        </Col>
                                        <Col md={2}>${item.product.price}</Col>
                                        <Col md={3}>
                                            <ButtonGroup>
                                                <Button variant="outline-danger" onClick={() => handleDecrement(item.product.id)}>-</Button>
                                                <Button variant="outline-secondary" disabled>{item.quantity}</Button>
                                                <Button variant="outline-success" onClick={() => handleIncrement(item.product.id)}>+</Button>
                                            </ButtonGroup>
                                        </Col>
                                        <Col md={2}>
                                            <Button
                                                variant="danger"
                                                onClick={() => removeFromCart(index)}
                                            >
                                                Remove
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card className="summary-card">
                            <Card.Header>Summary</Card.Header>
                            <Card.Body>
                                <h5>Total Items: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</h5>
                                <h5>
                                    Total Price: $
                                    {cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}
                                </h5>
                                <Button
                                    variant="warning"
                                    className="w-100 mt-3"
                                    onClick={clearCart}
                                >
                                    Clear Cart
                                </Button>
                                <Button variant="success" className="w-100 mt-3" onClick={handleCheckout}>
                                    Proceed to Checkout
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Cart;
