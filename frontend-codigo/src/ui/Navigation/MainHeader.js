import "./MainHeader.css";
import logo from "../Assets/LogoHackAExperience.jpg";
import { Link } from "react-router-dom";

const MainHeader = (props) => {
  return (
    <header className="main-header">
      <Link to={"/"}>
        <img src={logo} alt="logo Hack A Experience" />
      </Link>
      {props.children}
    </header>
  );
};

export default MainHeader;
