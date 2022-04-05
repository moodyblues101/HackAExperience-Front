import "./style.css";
import RegisterForm from "../../components/RegisterForm";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="register_page page">
      <h2 className="register_title">Registro</h2>
      <RegisterForm />
      <p className="register_login">
        ¿Ya tienes cuenta?
        <Link to="/login">¡Loguéate!</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
