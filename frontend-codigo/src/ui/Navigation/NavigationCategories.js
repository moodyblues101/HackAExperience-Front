import { NavLink } from "react-router-dom";

import "./NavigationCategories.css";

const NavigationCategories = () => {
  return (
    <nav>
      <ul className="nav-cat-ul">
        <li>
          <NavLink to="/category/Bienestar/1">Bienestar</NavLink>
        </li>
        <li>
          <NavLink to="/category/Gastronomía/2">Gastronomia</NavLink>
        </li>
        <li>
          <NavLink to="/category/Velocidad/3">Velocidad</NavLink>
        </li>
        <li>
          <NavLink to="/category/Aventura/4">Aventura</NavLink>
        </li>
        {/* <li className="main-li">
    <NavLink to="/sopresa">Sorpresa</NavLink>
  </li> */}
      </ul>
    </nav>
  );
};

export default NavigationCategories;
