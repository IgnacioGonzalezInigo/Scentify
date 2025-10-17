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
        prev.map((item) => {
            if (item.id !== id) return item;
            const quantity = Number(item.quantity || 0);
            const stock = item.stock === undefined ? undefined : Number(item.stock);
        
            if (stock === undefined || quantity + 1 <= stock) {
            return { ...item, quantity: quantity + 1 };
            }
            return item;
        })
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
            decreaseItem,   
            increaseItem,   
            clearCart,
            countCartItems,
            countTotalPrice,
        }}
        >
        {children}
        </CartContext.Provider>
    );
}