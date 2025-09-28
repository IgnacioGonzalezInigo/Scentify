import CartWidget from "./CartWidget";
import './NavBar.css'
import { Link } from "react-router";

export default function NavBar(){
  return <header>
      <nav className="nav-menu">
        <div className="nav-logo">
          <Link to="/">SCENTIFY</Link>
        </div>
        
        <ul className="nav-links">
          <li><Link to="/category/Aromatica">Aromática</Link></li>
          <li><Link to="/category/Amaderada">Amaderada</Link></li>
          <li><Link to="/category/Citrica">Cítrica</Link></li>
          <li><Link to="/category/Ambarina">Ambarina</Link></li>
        </ul>

        <div className="nav-cart">
          <Link to="/cart">
            <CartWidget />
          </Link>
        </div>
      </nav>
    </header>
}