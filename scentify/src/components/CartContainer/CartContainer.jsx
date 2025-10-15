import { useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "../../context/CartContext";

function CartContainer() {
    const { cartItems, clearCart, removeItem, countTotalPrice } = useContext(CartContext);
    

    // Carrito vacio
    if (cartItems.length === 0) {
    return (
        <section style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Carrito vacío</h1>
        <p>Agregá productos para comenzar tu compra.</p>
        <Link to="/">
            <button>Volver a la tienda</button>
        </Link>
        </section>
    );
    }

  // Carrito con productos
    return (
        <section>
            <h1>Carrito</h1>

            {cartItems.map((item) => (
            <div>
                <img src={item.img} width={80} />
                <h3>{item.title}</h3>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio unitario: ${item.price}</p>
                <p>Subtotal: ${item.price * item.quantity}</p>
                <button onClick={() => removeItem(item.id)}>Eliminar</button>
            </div>
            ))}

            <h2>Total a pagar: ${countTotalPrice()}</h2>
            <button onClick={clearCart}>Vaciar carrito</button>
            <Link to="/checkout">
            <button>Ir al checkout</button>
            </Link>
        </section>
    );
}

export default CartContainer;
