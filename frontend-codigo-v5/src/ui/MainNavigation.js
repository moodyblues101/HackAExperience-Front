import { NavLink } from "react-router-dom";

import "./MainNavigation.css";

const MainNavigation = () => {
  return (
    <nav>
      <ul className="main-ul">
        <li className="main-li">
          <NavLink to="/bienestar">Bienestar</NavLink>
        </li>
        <li className="main-li">
          <NavLink to="/gastronomia">Gastronomía</NavLink>
        </li>
        <li className="main-li">
          <NavLink to="/conduccion">Conducción</NavLink>
        </li>
        <li className="main-li">
          <NavLink to="/aventura">Aventura</NavLink>
        </li>
        <li className="main-li">
          <NavLink to="/sopresa">Sorpresa</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
