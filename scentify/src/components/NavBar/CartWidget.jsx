import { useContext } from "react";

import { CartContext } from "../../context/CartContext";

export default function CartWidget() {
  const { countCartItems } = useContext(CartContext);

  return (
    <span>
      🛒 ({countCartItems()})
    </span>
  );
}