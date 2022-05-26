import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer_main">
      <Link to="/" className="logo_footer">
        © 2022 HackAnExperience, Inc.
      </Link>
      <div>
        <Link to="/" className="info_footer">FAQ</Link>
      </div>
      <div>
        <Link to="/" className="info_footer">Acerca de </Link>
      </div>
      {/* <div className="info_footer">Logos RRSS</div> */}
    </footer>
  );
};

export default Footer;
