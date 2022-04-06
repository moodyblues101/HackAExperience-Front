import { Link } from "react-router-dom";

import classes from "./MainHeader.module.css";
import { SearchIcon } from "@heroicons/react/outline";

const MainHeader = () => {
  return (
    <header className={classes.header_main}>
      <Link to="/" className={classes.logo}>
        HackAnExperience
      </Link>
      <form className={classes.form_search}>
        <input />
        <button className={classes.btn_search}>
          <SearchIcon className={classes.icon_search} />
        </button>
      </form>
      <div>
        <button className={classes.btn_login}>Login</button>
        <button className={classes.btn_register}>Register</button>
      </div>
    </header>
  );
};

export default MainHeader;
