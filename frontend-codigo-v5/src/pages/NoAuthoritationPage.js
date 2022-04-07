import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="centered">
      <p>No tienes autorizacion</p>
      <Link to="/">Ir a pagina principal</Link>
    </div>
  );
};

export default NotFound;
