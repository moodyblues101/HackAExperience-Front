import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from "../../store/auth-context";
import SideDrawer from "./SideDrawer";
import Backdrop from "../Backdrop";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import NavigationCategories from "./NavigationCategories";
import { SearchIcon } from "@heroicons/react/outline";
import NavLinksSide from "./NavLinksSide";
import logo from "../../assets/images-logos/LogoHackAExperience.jpg";

import "./MainNavigation.css";

const MainNavigation = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const userRole = useContext(AuthContext).userRole;
  const history = useHistory();

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const searchHandle = () => {
    history.push("/search");
  };

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinksSide />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <Link to="/">
          <img
            className="main-navigation__logo"
            src={logo}
            alt="logo empresa"
          />
        </Link>
        <button className="search-btn" onClick={searchHandle}>
          <SearchIcon className="icon_search" />
        </button>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
      {userRole !== "administrador" && <NavigationCategories />}
    </>
  );
};

export default MainNavigation;
