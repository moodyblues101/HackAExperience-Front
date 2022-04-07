import { Fragment, useContext } from "react";

import Footer from "./Footer";
import MainHeader from "./MainHeader";
import MainNavigation from "./MainNavigation";
// import "./Layout.css";
import AuthContext from "../store/auth-context";

const Layout = (props) => {
  const authCtx = useContext(AuthContext);
  const isAdmin = authCtx.role === "admin";
  return (
    <Fragment>
      <MainHeader />
      {!isAdmin && <MainNavigation />}
      <main className="main-layout">{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
