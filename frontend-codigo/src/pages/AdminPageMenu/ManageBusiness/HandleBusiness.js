import { useState, useEffect, useCallback, useContext } from "react";

import { useHttpClient } from "../../../hooks/http-hook";
import { AuthContext } from "../../../store/auth-context";
import Button from "../../../ui/FormElements/Button";
import ErrorModal from "../../../ui/ErrorModal";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import Modal from "../../../ui/Modal";
import UpdateBusiness from "./UpdateBusiness";
import formatDate from "../../../util/formatDate";

const HandleBusiness = () => {
  const auth = useContext(AuthContext);
  const [businessList, setBusinessList] = useState([]);
  const [showList, setShowList] = useState(true);
  const [isConfirmDelShow, setIsConfirmDelShow] = useState(false);
  const [isConfirmUpdateShow, setIsConfirmUpdateShow] = useState(false);
  const [delOk, setDelOk] = useState(false);
  const [idToHandle, setIdToHandle] = useState(null);
  const [nameToHandle, setNameToHandle] = useState("");

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchBusiness = useCallback(async () => {
    try {
      const res = await sendRequest("http://localhost:3000/api/v1/business");
      setBusinessList(res);
    } catch (err) {}
  }, [sendRequest]);

  useEffect(() => {
    fetchBusiness();
  }, [fetchBusiness]);

  const updateHandler = (id, name) => {
    setIdToHandle(id);
    setNameToHandle(name);
    setIsConfirmUpdateShow(true);
    setShowList(false);
  };

  const deleteHandler = (id) => {
    setIdToHandle(id);
    setIsConfirmDelShow(true);
  };

  const cancelHandler = () => {
    setIsConfirmDelShow(false);
  };

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:3000/api/v1/business/${idToHandle}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );

      setDelOk(true);
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {showList && (
        <div>
          <h2>Listado de empresas</h2>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Fecha de creación</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {businessList.map((bus) => {
                return (
                  <tr key={bus.id}>
                    <td>{bus.id}</td>
                    <td>{bus.name}</td>
                    <td>
                      {formatDate(bus.createdAt).day +
                        "/" +
                        formatDate(bus.createdAt).month +
                        "/" +
                        formatDate(bus.createdAt).year}
                    </td>
                    <td>
                      <div>
                        <Button
                          type="button"
                          onClick={() => updateHandler(bus.id, bus.name)}
                        >
                          ACTUALIZAR
                        </Button>
                        <Button
                          type="button"
                          onClick={() => deleteHandler(bus.id)}
                        >
                          BORRAR
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Button to="/user/admin/business">VOLVER</Button>
        </div>
      )}
      <Modal
        show={isConfirmDelShow}
        onCancel={cancelHandler}
        footer={
          <div>
            <Button type="button" onClick={cancelHandler}>
              CANCELAR
            </Button>
            <Button type="button" onClick={confirmDeleteHandler}>
              BORRAR
            </Button>
          </div>
        }
      >
        <p>
          {`¿Está seguro de que quiere borrar los datos de la empresa con id ${idToHandle}?`}
        </p>
        <p>Una vez aceptado, la acción no se podrá deshacer</p>
      </Modal>

      {isConfirmUpdateShow && (
        <UpdateBusiness id={idToHandle} name={nameToHandle} />
      )}

      <Modal
        show={delOk}
        footer={<Button to="/user/admin/business">OK</Button>}
      >
        <p>Acción ejecutada correctamente</p>
      </Modal>
    </>
  );
};

export default HandleBusiness;
