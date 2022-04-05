import "./style.css";
import EditPasswordForm from "../../components/EditPasswordForm";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import decodeTokenData from "../../helpers/decodeTokenData";

const EditPasswordPage = () => {
  const [token] = useUserTokenContext();
  const { id } = decodeTokenData(token);

  return (
    <div className="edit_password_page page">
      <h2 className="edit_password_title">Cambia tu contraseña</h2>
      <EditPasswordForm userId={id} />
    </div>
  );
};

export default EditPasswordPage;
