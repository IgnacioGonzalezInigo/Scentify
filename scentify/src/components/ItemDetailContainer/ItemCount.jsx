import { useState } from "react";

export default function ItemCount({ stock, initial = 1, onAdd }) {
    const [count, setCount] = useState(initial);

    function increase() {
        if (count < stock) setCount(count + 1);
    }

    function decrease() {
        if (count > 1) setCount(count - 1);
    }

    return (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <button onClick={decrease}>-</button>
            <span>{count}</span>
            <button onClick={increase}>+</button>
            </div>
            <button
            style={{ marginTop: "10px" }}
            onClick={() => onAdd(count)}
            // Esto lo agrego para que si no hay stock no se pueda agregar
            disabled={stock === 0}
            >
            Agregar al carrito
            </button>
        </div>
    );
}
