import { Fragment } from "react";

import Footer from "./Footer";
import MainHeader from "./MainHeader";
import MainNavigation from "./MainNavigation";
// import "./Layout.css";

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader />
      <MainNavigation />
      <main className="main-layout">{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
