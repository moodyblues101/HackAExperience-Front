import { Link } from "react-router-dom";
import imagen from "./girl-lift-her-hands-to-the-sky-and-feel-freedom.jpg";
import "./AcercadePage.css";

const AcercadePage = () => {
  return (
    <div>
      <h2>¿Quiénes somos?</h2>
      <p>
        Somos un grupo de personas que creeemos en las experiencias como fuente
        de aprendizaje y diversión. A través de nuestra web podrás reservar las
        experiencias que más se adapten a ti y crear recuerdos que te
        acompañarán siempre.
      </p>
      <img src={imagen} />
    </div>
  );
};

export default AcercadePage;
