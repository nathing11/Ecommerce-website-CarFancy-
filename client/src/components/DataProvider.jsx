import { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = (props) => {
    const [products, setProducts] = useState(null);
    const [cart, setCart] = useState([]);

    const addCart = (obj) => {
        // Check if the product is already in the cart
        const existingProduct = cart.find((product) => product._id === obj._id);

        if (!existingProduct) {
            // If not in the cart, add it with a quantity of 1
            setCart([...cart, obj]);
        } else {
            // If already in the cart, update the quantity
            setCart((prevCart) =>
                prevCart.map((product) =>
                    product._id === obj._id
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                )
            );
        }
    };

    useEffect(() => {
        // Load cart data from local storage on component mount
        const dataCart = JSON.parse(localStorage.getItem('cart'));
        if (dataCart) setCart(dataCart);
    }, []);

    useEffect(() => {
        // Update local storage when the cart changes
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const value = {
        products: [products, setProducts],
        cart: [cart, setCart],
        addCart: addCart,
    };

    return (
        /* eslint-disable react/prop-types */
        <DataContext.Provider value={value}>
            {props.children}
        </DataContext.Provider>
    );
};
