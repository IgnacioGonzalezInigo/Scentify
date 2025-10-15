import { createContext, useState } from "react";

export const CartContext = createContext("default value");

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addItem(newItem, quantityCount = 1) {
        const newCart = structuredClone(cartItems);
        const idx = newCart.findIndex((i) => i.id === newItem.id);

        if (idx !== -1) {
        newCart[idx].quantity = (newCart[idx].quantity || 0) + quantityCount;
        } else {
        newCart.push({ ...newItem, quantity: quantityCount });
        }
        setCartItems(newCart);
    }

    function removeItem(idToRemove) {
        setCartItems((prev) => prev.filter((i) => i.id !== idToRemove));
    }

    function decreaseItem(id) {
        setCartItems((prev) => {
        const next = prev.map((i) =>
            i.id === id ? { ...i, quantity: (i.quantity || 0) - 1 } : i
        );
        return next.filter((i) => (i.quantity || 0) > 0);
        });
    }

    
    function increaseItem(id) {
        setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: (i.quantity || 0) + 1 } : i))
        );
    }

    function clearCart() {
        setCartItems([]);
    }

    function countCartItems() {
        return cartItems.reduce((acc, i) => acc + (Number(i.quantity) || 0), 0);
    }

    function countTotalPrice() {
        return cartItems.reduce(
        (acc, i) => acc + (Number(i.price) || 0) * (Number(i.quantity) || 0),
        0
        );
    }

    return (
        <CartContext.Provider
        value={{
            cartItems,
            addItem,
            removeItem,
            decreaseItem,   // 👈 nuevo
            increaseItem,   // 👈 opcional (útil para +)
            clearCart,
            countCartItems,
            countTotalPrice,
        }}
        >
        {children}
        </CartContext.Provider>
    );
}