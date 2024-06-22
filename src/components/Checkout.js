import React, { useContext, useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate payment processing
        setShowConfirmation(true);
        clearCart();
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Checkout</h2>
            {showConfirmation ? (
                <Alert variant="success">
                    Your payment was successful! Thank you for your purchase.
                </Alert>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col md={6}>
                            <Form.Group controlId="cardNumber">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="expirationDate">
                                <Form.Label>Expiration Date</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="expirationDate"
                                    value={formData.expirationDate}
                                    onChange={handleChange}
                                    placeholder="MM/YY"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="cvv">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit" className="mt-3">
                        Pay Now
                    </Button>
                </Form>
            )}
        </Container>
    );
};

export default Checkout;
