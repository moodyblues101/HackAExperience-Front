import { Link } from "react-router-dom";

// import logo from "../../assets/images-logos/LogoHackAExperience.jpg";
import facebook from "../../assets/images-logos/Logo-Facebook.jpg";
import instagram from "../../assets/images-logos/Logo-Instagram.jpg";
import twitter from "../../assets/images-logos/Logo-Twitter.jpg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer_main">
      {/* <Link to="/">
        <img className="footer_logo" src={logo} alt="logo" />
      </Link> */}
      <div>
        <span className="footer-acercade">
          <Link to="/acercade">Acerca de</Link>
        </span>
      </div>
      <div className="footer-logo-rrss-container">
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <img
            className="footer-logo-rrss"
            src={facebook}
            alt="logo facebook"
          />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <img
            className="footer-logo-rrss"
            src={instagram}
            alt="logo instagram"
          />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
          <img className="footer-logo-rrss" src={twitter} alt="logo twitter" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
