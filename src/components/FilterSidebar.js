// src/components/FilterSidebar.js
import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import './FilterSidebar.css';

const FilterSidebar = ({ onFilter, onClearFilters }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minReviews, setMinReviews] = useState('');
    const [minRating, setMinRating] = useState('');

    const handleFilter = () => {
        onFilter({ minPrice, maxPrice, minReviews, minRating });
    };

    const handleClearFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        setMinReviews('');
        setMinRating('');
        onClearFilters();
    };

    return (
        <div className="filter-sidebar">
            <Form className="filter-form">
                <h5 className="filter-title">Filter by Price</h5>
                <Form.Group controlId="minPrice">
                    <Form.Label>Min Price</Form.Label>
                    <FormControl
                        type="number"
                        placeholder="Enter minimum price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className='mt-2' controlId="maxPrice">
                    <Form.Label>Max Price</Form.Label>
                    <FormControl
                        type="number"
                        placeholder="Enter maximum price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </Form.Group>
                <h5 className="filter-title mt-4">Filter by Reviews</h5>
                <Form.Group controlId="minReviews">
                    <Form.Label>Min Reviews</Form.Label>
                    <FormControl
                        type="number"
                        placeholder="Enter minimum reviews"
                        value={minReviews}
                        onChange={(e) => setMinReviews(e.target.value)}
                    />
                </Form.Group>
                <h5 className="filter-title mt-4">Filter by Rating</h5>
                <Form.Group controlId="minRating">
                    <Form.Label>Min Rating</Form.Label>
                    <FormControl
                        type="number"
                        placeholder="Enter minimum rating"
                        value={minRating}
                        onChange={(e) => setMinRating(e.target.value)}
                        step="0.1"
                        min="0"
                        max="5"
                    />
                </Form.Group>
                <div className='d-flex align-items-end justify-content-between'>
                    <Button variant="primary" className="filter-button mt-4" onClick={handleFilter}>
                        Apply Filters
                    </Button>
                    <Button variant="secondary" className="filter-clear-button" onClick={handleClearFilters}>
                        Clear Filters
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default FilterSidebar;
