import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <nav>
      <ul className={classes.ul}>
        <li className={classes.li}>
          <Link to="/bienestar">Bienestar</Link>
        </li>
        <li className={classes.li}>
          <Link to="/gastronomia">Gastronomia</Link>
        </li>
        <li className={classes.li}>
          <Link to="/conduccion">Conduccion</Link>
        </li>
        <li className={classes.li}>
          <Link to="/aventura">Aventura</Link>
        </li>
        <li className={classes.li}>
          <Link to="/sopresa">Sorpresa</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
