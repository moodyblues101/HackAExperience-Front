import { Link } from "react-router-dom";

import logo from "../../assets/images-logos/LogoHackAExperience.jpg";
import facebook from "../../assets/images-logos/Logo-Facebook.jpg";
import instagram from "../../assets/images-logos/Logo-Instagram.jpg";
import twitter from "../../assets/images-logos/Logo-Twitter.jpg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer_main">
      <Link to="/">
        <img className="footer_logo" src={logo} alt="logo" />
      </Link>
      <div>
        <span className="footer-acercade">
          <Link to="/acercade">Acerca de</Link>
        </span>
        {/* <span>
          <Link to="/">FAQ</Link>
        </span> */}
      </div>
      <div className="footer-logo-rrss-container">
        <Link to="http://www.facebook.com">
          <img
            className="footer-logo-rrss"
            src={facebook}
            alt="logo facebook"
          />
        </Link>
        <Link to="http://www.instagram.com">
          <img
            className="footer-logo-rrss"
            src={instagram}
            alt="logo instagram"
          />
        </Link>
        <Link to="http://www.twitter.com">
          <img className="footer-logo-rrss" src={twitter} alt="logo twitter" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
