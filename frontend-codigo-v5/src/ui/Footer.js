import { Link } from "react-router-dom";

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
      <div>Logos RRSS</div>
    </footer>
  );
};

export default Footer;
