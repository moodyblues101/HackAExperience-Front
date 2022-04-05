import "./style.css";
import LoginForm from "../../components/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="login_page page">
      <h2 className="login_title">Login</h2>
      <LoginForm />
      <p className="login_register">
        ¿No tienes cuenta?
        <Link to="/register">¡Regístrate!</Link>
      </p>
    </div>
  );
};

export default LoginPage;
