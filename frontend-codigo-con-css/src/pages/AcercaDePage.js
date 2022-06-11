import imagen from "../assets/images/girl-lift-her-hands-to-the-sky-and-feel-freedom.jpg";
import "./AcercaDePage.css";

const AcercadePage = () => {
  return (
    <div className="acercade-containter">
      <h2>¿Quiénes somos?</h2>
      <p>
        Somos un grupo de personas que creeemos en las experiencias como fuente
        de aprendizaje y diversión. A través de nuestra web podrás reservar las
        experiencias que más se adapten a ti y crear recuerdos que te
        acompañarán siempre.
      </p>

      <img
        className="acercade-img"
        src={imagen}
        alt="girl lift her hands to the sky and feel freedom"
      />
    </div>
  );
};

export default AcercadePage;
