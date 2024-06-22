import React, { createContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, quantity) => {
        const existingProductIndex = cartItems.findIndex(item => item.product.id === product.id);
        if (existingProductIndex >= 0) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingProductIndex].quantity += quantity;
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { product, quantity }]);
        }
    };

    const updateCartItemQuantity = (productId, quantity) => {
        const updatedCartItems = cartItems.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
        ).filter(item => item.quantity > 0);
        setCartItems(updatedCartItems);
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

export { CartContext, CartProvider };
