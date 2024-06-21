import React from 'react';
import Product from './Product';
import { Row, Col } from 'react-bootstrap';

const ProductList = ({ products, addToCart }) => {
    return (
        <div>
            <Row>
                {products.map(product => (
                    <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                        <Product product={product} addToCart={addToCart} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductList;
