// src/components/CartContainer/CartContainer.jsx
import { useContext, useState } from "react";
import { Link } from "react-router";             
import { CartContext } from "../../context/CartContext";
import FormCheckout from "./FormCheckout";

function CartContainer() {
    const {
        cartItems,
        removeItem, // Saca todo lo de un producto 
        clearCart, // Saca todos los productos 
        decreaseItem, // Disminuye 1 de un prod
        increaseItem, // Aumenta 1 de un prod
        countTotalPrice,                                   
    } = useContext(CartContext);

    const [isCheckout,setIsCheckout] = useState (false);
    const [orderId,setOrderId] = useState(null);

    if (cartItems.length === 0) {
        return (
            <section style={{ textAlign: "center", padding: "2rem" }}>
                <h1>Carrito vacío</h1>
                <p>Agregá productos para comenzar tu compra.</p>
                <Link to="/"><button>Volver a la tienda</button></Link>
            </section>
        );
    }

    function handleCheckout (buyer){
        const order = {
            buyer, 
            items: cartItems.map (i => ({
                id : i.id,
                title : i.title,
                price : i.price,
                quantity : i.quantity,
            })),
            total: countTotalPrice(),
        }

        // Despues implemento lo de el ORDER ID
        
        clearCart()

    }
    return (
        <section style={{ maxWidth: 960, margin: "0 auto", padding: "1rem" }}>
            {isCheckout ? (
                <>
                    <FormCheckout handleCheckout={handleCheckout} />
                    {orderId && (
                        <div style={{ marginTop: 12, padding: 12, border: "1px solid #e5e7eb", borderRadius: 8 }}>
                            <p>✅ ¡Compra confirmada!</p>
                            <p><strong>Tu ID de orden:</strong> {orderId}</p>
                            <Link to="/"><button>Volver al inicio</button></Link>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <h1>Carrito</h1>
                    {/* Cards de productos */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "16px",
                            marginTop: "16px",
                        }}
                    >
                        {cartItems.map((item) => {
                            const price = Number(item.price) || 0;
                            const qty = Number(item.quantity) || 0;
                            const subtotal = (price * qty).toFixed(2);
                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "12px",
                                        padding: "12px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "8px",
                                        boxShadow: "0 1px 4px rgba(0,0,0,.06)",
                                    }}
                                >
                                    <div style={{ display: "flex", gap: "12px" }}>
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            style={{ width: 90, height: "auto", borderRadius: "8px" }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <strong style={{ display: "block" }}>{item.title}</strong>
                                            <span style={{ fontSize: 12, opacity: 0.7 }}>
                                                ${price.toFixed(2)} c/u
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginTop: 8,
                                        }}
                                    >
                                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                            <button onClick={() => decreaseItem(item.id)}>-</button>
                                            <span><strong>{qty}</strong></span>
                                            <button onClick={() => increaseItem(item.id)}>+</button>
                                        </div>

                                        <div>
                                            Subtotal: <strong>${subtotal}</strong>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                                        <button onClick={() => removeItem(item.id)}>Eliminar</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, borderTop: "1px solid #e5e7eb", paddingTop: 12 }}>
                        <h2>Total a pagar: ${countTotalPrice().toFixed(2)}</h2>
                        <div style={{ display: "flex", gap: 10 }}>
                            <button onClick={clearCart}>Vaciar carrito</button>
                            <button onClick={() => setIsCheckout(true)}>Ir al checkout</button>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}
export default CartContainer;