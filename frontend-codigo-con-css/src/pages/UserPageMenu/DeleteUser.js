import { useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../store/auth-context";
import Card from "../../ui/Card";
import Button from "../../ui/FormElements/Button";
import LoadingSpinner from "../../ui/LoadingSpinner";
import Modal from "../../ui/Modal";

import "./DeleteUser.css";

const DeleteUser = () => {
  const params = useParams();
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isDeleted, setIsDeleted] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const deleteUserHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:3000/api/v1/users/${params.userId}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setIsDeleted(true);
    } catch (err) {}
  };

  const endHandler = () => {
    auth.logout();
    history.replace("/");
  };

  return (
    <>
      <Modal
        onCancel={clearError}
        header="Error"
        show={error}
        footer={<Button to={`/user/${params.userId}/personal`}>OK</Button>}
      >
        <p>{error}</p>
      </Modal>
      {isLoading && <LoadingSpinner />}
      <div className="delete-user-container">
        <Card>
          <p>¿Está seguro de que quiere darse de baja?</p>
          <p>Todos sus datos serán eliminados.</p>
          <Button type="button" onClick={deleteUserHandler}>
            OK
          </Button>
          <Button to={`/user/${params.userId}/personal`}>VOLVER</Button>
        </Card>
      </div>
      {isDeleted && (
        <Modal
          show={!error}
          footer={
            <Button type="button" onClick={endHandler}>
              OK
            </Button>
          }
        >
          <p>Usuario borrado correctamente</p>
        </Modal>
      )}
    </>
  );
};

export default DeleteUser;
