import { Link } from "react-router-dom";
import logoFacebook from "../Assets/Logo-Facebook.jpg";
import logoTwitter from "../Assets/Logo-Twitter.jpg";
import logoInstagram from "../Assets/Logo-Instagram.jpg";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer_main">
      <Link to="/" className="logo">
        HackAExperience
      </Link>
      <div>
        <Link to="/acercade"> Acerca de</Link>
      </div>
      <div>
        <Link to="/">FAQ</Link>
      </div>
      <div className="logos">
        <Link to={{ pathname: "https://www.facebook.com" }} target="_blank">
          <img className="logo-footer" src={logoFacebook} alt="logo Facebook" />
        </Link>
        <Link to={"https://www.twitter.com"}>
          <img className="logo-footer" src={logoTwitter} alt="logo twitter" />
        </Link>
        <Link to={"https:www.instagram.com"}>
          <img
            className="logo-footer"
            src={logoInstagram}
            alt="logo instagram"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
