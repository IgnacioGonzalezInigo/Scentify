import { createContext, useState } from "react";

// * 1: Crear un contexto -> createContext()
const CartContext = createContext ("default value");

// 2. Renderizar el Provider del contexto -> <context.Provider>
// *2. Crear un Custom Provider del contexto -> context.provider con su propio VALUE
// * 3. Darle un "valor" o value al contenido del provider -> props.value

export function CartProvider( { children }){

    const [cartItems, setCartItems] = useState([]);
    // ? CRUD -> Create/Read/Update/Delete 

    function addItem(newItem,quantityCount = 1) {
        //cartItems.push( {newItem: "Item"} ) -> MAL❌
        const newCart = structuredClone(cartItems)
        const isInCart = cartItems.some(item => item.id === newItem.id)

        if (isInCart) {
        const index = cartItems.findIndex(item => item.id === newItem.id)
        newCart[index].quantity = (newCart[index].quantity || 0) + quantityCount;
        alert(`Sumaste ${quantityCount} unidad(es) al carrito"+`)
        }
        else {
        newItem.quantity = quantityCount
        newCart.push(newItem)
        alert("Agregaste al carrito!")
        }
        setCartItems(newCart)
    }

    function countCartItems() {
        let count = 0;
        cartItems.forEach(item => count += item.quantity)
        return count;
    }

    function removeItem(idToRemove){
        const newCart = cartItems.filter( itemInCart => itemInCart.id !== idToRemove)
        setCartItems(newCart)
    }

    // countTotalPrice()
    // removeUnitFromItem()
    // clearCart()  

    return (
        <CartContext.Provider value={{ cartItems, addItem, countCartItems, removeItem }}>
            { children }        
        </CartContext.Provider>
    )
}

export { CartContext }