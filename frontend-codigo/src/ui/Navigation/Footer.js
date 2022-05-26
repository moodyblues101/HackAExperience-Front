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
      <div className="logos">Logos RRSS</div>
      <Link to={"https:www.facebook.com"}>
        <img src={logoFacebook} alt="logo Facebook" />
      </Link>
      <Link to={"https:www.twitter.com"}>
        <img src={logoTwitter} alt="logo twitter" />
      </Link>
      <Link to={"https:www.instagram.com"}>
        <img src={logoInstagram} alt="logo instagram" />
      </Link>
    </footer>
  );
};

export default Footer;
