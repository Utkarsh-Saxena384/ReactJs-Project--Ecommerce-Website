import React, { useEffect, useState } from 'react';
import Product from './Product';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import FilterSidebar from './FilterSidebar';
import './ProductList.css'

const ProductList = ({ addToCart, searchQuery }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const categoryImages = {
        'Home': 'images/download.png',
        'electronics': 'images/Electronic circuit icon.jpeg',
        'jewelery': 'images/elegant-diamond-logo_23-2148625880.jpg',
        "men's clothing": 'images/hoodie-design-template-93316b039821340d87e58746307482b2_screen.jpg',
        "women's clothing": 'images/free-vector-feminine-fashion-business-logo-design_650144-2211.jpg',
    };

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data);
                const uniqueCategories = [...new Set(response.data.map(product => product.category))];
                setCategories(uniqueCategories);
            });
    }, []);

    useEffect(() => {
        if (searchQuery) {
            handleSearch(searchQuery);
        }
    }, [searchQuery]);

    const handleCategoryClick = (category) => {
        if (category === 'Home') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product => product.category === category));
        }
    };

    const handleSearch = (query) => {
        if (!query) {
            setFilteredProducts(products);
        } else {
            const lowerCaseQuery = query.toLowerCase();
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(lowerCaseQuery) ||
                product.category.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredProducts(filtered);
        }
    };

    const handleFilter = ({ minPrice, maxPrice, minReviews, minRating }) => {
        let filtered = products;

        if (minPrice) {
            filtered = filtered.filter(product => product.price >= minPrice);
        }
        if (maxPrice) {
            filtered = filtered.filter(product => product.price <= maxPrice);
        }
        if (minReviews) {
            filtered = filtered.filter(product => product.rating.count >= minReviews);
        }
        if (minRating) {
            filtered = filtered.filter(product => product.rating.rate >= minRating);
        }

        setFilteredProducts(filtered);
    };

    const handleClearFilters = () => {
        setFilteredProducts(products);
    };

    return (
        <Container fluid>
            <Row className='mt-3'>
                <Col xs={12} className="d-flex justify-content-center mb-4">
                    {['Home', ...categories].map((category) => (
                        <Button
                            key={category}
                            variant="outline-primary"
                            className="mx-2"
                            onClick={() => handleCategoryClick(category)}
                        >
                            <img
                                src={categoryImages[category]}
                                alt={category}
                                className="category-image"
                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                            />
                        </Button>
                    ))}
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={9}>
                    <Row>
                        {filteredProducts.map(product => (
                            <Col key={product.id} sm={12} md={4} lg={4} xl={4} className="mb-4">
                                <Product product={product} addToCart={addToCart} />
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col xs={12} md={3} className="d-none d-md-block">
                    <FilterSidebar onFilter={handleFilter} onClearFilters={handleClearFilters} />
                </Col>
            </Row>
        </Container>
    );
};

export default ProductList;
