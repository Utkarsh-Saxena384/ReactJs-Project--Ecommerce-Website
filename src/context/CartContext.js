import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

const useCart = () => {
    return useContext(CartContext);
};

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    // useEffect(() => {
    //     localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // }, [cartItems]);

    const addToCart = (product, quantity) => {
        const existingProductIndex = cartItems.findIndex(item => item.product.id === product.id);
        if (!(existingProductIndex >= 0)) {
            setCartItems([...cartItems, { product, quantity }]);
            console.log([...cartItems, { product, quantity }]);
            localStorage.setItem('cartItems', JSON.stringify([...cartItems, { product, quantity }]));
        }
    };

    const updateCartItemQuantity = (productId, quantity) => {
        const updatedCartItems = cartItems.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
        ).filter(item => item.quantity > 0);
        setCartItems(updatedCartItems);
        console.log(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    const removeFromCart = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartItemQuantity = (productId) => {
        const cartItem = cartItems.find(item => item.product.id === productId);
        return cartItem ? cartItem.quantity : 0;
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, updateCartItemQuantity, removeFromCart, clearCart, getCartItemQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider, useCart };
