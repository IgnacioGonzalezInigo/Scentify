import { useParams, Link } from "react-router";
import { useEffect, useState, useContext } from "react";
import { getProductById } from "../../data/firebase"; 
import { CartContext } from "../../context/CartContext";
import ItemCount from "./ItemCount";
import "./ItemDetailContainer.css";

function ItemDetailContainer(){  
  const { idParam } = useParams();
  const [product, setProduct] = useState({ loading: true });

  const [added, setAdded] = useState(false);
  const { addItem } = useContext(CartContext);



  useEffect( () => {
    console.log("idParam recibido:", idParam);
    getProductById(idParam)
      .then( reponse => setProduct(reponse))
      .catch( error => alert(error))
  }, [idParam])

  /* renderizado condicional */
  /* early return con if */
  if ( product.loading)
    {
      return(<h2>Cargando...</h2>);
    }

  const handleAdd = (qty) => {
    addItem(product, qty);
    setAdded(true);
  };

  return (
    <div className="item-card">
      <h3 className="item-card-title">{product.title}</h3>
      <img
        className="item-card-img"
        src={product.img}
        alt={product.title}
      />
      <p className="item-card-price">Precio: ${product.price}</p>
      <p style={{ fontSize: "12px", opacity: "0.6" }}>
        {product.description}
      </p>

      {!added ? (
        <ItemCount stock={product.stock} initial={1} onAdd={handleAdd} />
      ) : (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <p>Agregaste este producto al carrito.</p>
          <Link className="detail-volver" to="/">
            Seguir comprando
          </Link>
          <br />
          <Link className="detail-volver" to="/cart">
            Ir al carrito
          </Link>
        </div>
      )}
      <hr />
    </div>
  );
}

export default ItemDetailContainer