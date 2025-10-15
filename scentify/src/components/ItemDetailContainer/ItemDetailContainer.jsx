import { useParams, Link } from "react-router";
import { getProductById } from "../../data/mockAPI";
import { useEffect, useState } from "react";
import "./ItemDetailContainer.css";
import ItemCount from "./ItemCount";

function ItemDetailContainer(){  
  const { idParam } = useParams();
  const [product, setProduct] = useState({ loading: true});


  useEffect( () => {
    getProductById(idParam)
      .then( reponse => setProduct(reponse))
      .catch( error => alert(error))
  }, [idParam])

  /* renderizado condicional */
  /* early return con if */
  if ( product.loading)
    {
      return(<h2>Cargando</h2>);
    }

  return (
    <div className="detail-container">
      <div className="detail-card">
        <img className="detail-img" src={product.img} alt={product.title} />
        <div className="detail-info">
          <h2>{product.title}</h2>
          <p className="detail-price">PRECIO: ${product.price}</p>
          <p className="detail-desc">{product.description}</p>
          <ItemCount stock={product.stock} onAdd={(qty) => alert(`Agregaste ${qty} unidades`)} />
          <Link className = "detail-volver"  to="/">Volver al listado</Link>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer