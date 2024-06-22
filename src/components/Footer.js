import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>About Us</h5>
                        <p>Learn more about our company and our mission to provide quality products to our customers.</p>
                    </Col>
                    <Col md={4}>
                        <h5>Contact</h5>
                        <p>Email: info@example.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </Col>
                    <Col md={4}>
                        <h5>Follow Us</h5>
                        <p>
                            <a href="#">Facebook</a>
                        </p>
                        <p>
                            <a href="#">Twitter</a>
                        </p>
                        <p>
                            <a href="#">Instagram</a>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mt-3">
                        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
