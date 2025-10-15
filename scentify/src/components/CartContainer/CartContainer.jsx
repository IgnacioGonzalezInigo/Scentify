// src/components/CartContainer/CartContainer.jsx
import { useContext } from "react";
import { Link } from "react-router";
import { CartContext } from "../../context/CartContext";

function CartContainer() {
    const {
        cartItems,
        removeItem,
        decreaseItem,
        increaseItem,
    } = useContext(CartContext);


    if (cartItems.length === 0) {
        return (
            <section style={{ textAlign: "center", padding: "2rem" }}>
                <h1>Carrito vacío</h1>
                <p>Agregá productos para comenzar tu compra.</p>
                <Link to="/"><button>Volver a la tienda</button></Link>
            </section>
    );
    }

    return (
        <section style={{ maxWidth: 960, margin: "0 auto", padding: "1rem" }}>
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

            {/* Controles de cantidad */}
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
    </section>
);
}

export default CartContainer;
