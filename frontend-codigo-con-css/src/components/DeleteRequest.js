import { useContext, useEffect } from "react";

import { AuthContext } from "../store/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import Modal from "../ui/Modal";
import LoadingSpinner from "../ui/LoadingSpinner";
import Button from "../ui/FormElements/Button";

const DeleteRequest = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const deleteRequest = async (idExp) => {
      try {
        await sendRequest(
          `http://localhost:3000/api/v1/experiences/${idExp}`,
          "DELETE",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );
      } catch (err) {}
    };
    deleteRequest(props.id);
  }, [props.id, auth.token, sendRequest]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Modal
        onCancel={clearError}
        header="Error"
        show={error}
        footer={<Button to="/user/admin">OK</Button>}
      >
        <p>{error}</p>
      </Modal>
      <Modal show={!error} footer={<Button to="/user/admin">OK</Button>}>
        <p>Experiencia {props.id} borrada correctamente</p>
      </Modal>
    </>
  );
};

export default DeleteRequest;
