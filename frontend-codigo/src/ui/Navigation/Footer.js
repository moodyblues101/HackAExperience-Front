import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer_main">
      <Link to="/" className="logo">
        HackAnExperience
      </Link>
      <div>
        <Link to="/">Acerca de</Link>
        <Link to="/">FAQ</Link>
      </div>
      <div>Logos RRSS</div>
    </footer>
  );
};

export default Footer;
