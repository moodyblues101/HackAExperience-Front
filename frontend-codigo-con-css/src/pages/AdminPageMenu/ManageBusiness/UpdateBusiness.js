import { useState, useContext } from "react";

import { useForm } from "../../../hooks/form-hook";
import { AuthContext } from "../../../store/auth-context";
import { useHttpClient } from "../../../hooks/http-hook";
import Button from "../../../ui/FormElements/Button";
import ErrorModal from "../../../ui/ErrorModal";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import Modal from "../../../ui/Modal";
import Input from "../../../ui/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../util/validators";
import Card from "../../../ui/Card";

const UpdateBusiness = ({ id, name }) => {
  const auth = useContext(AuthContext);
  const [showModalOk, setShowModalOk] = useState(false);
  const [errorNameExists, setErrorNameExists] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      name: { value: name, isValid: true },
    },
    true
  );

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await sendRequest(
        `http://localhost:3000/api/v1/business/name/${formState.inputs.name.value}`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );

      if (res.length === 1) {
        setErrorNameExists(true);
        throw new Error();
      }

      await sendRequest(
        `http://localhost:3000/api/v1/business/${id}`,
        "PATCH",
        JSON.stringify({ name: formState.inputs.name.value }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setShowModalOk(true);
    } catch (err) {}
  };

  const cancelNameError = () => {
    setErrorNameExists(false);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <h2>Actualizar empresa</h2>
      <Card>
        <form onSubmit={submitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Introduce el nuevo valor:"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
            errorText="Por favor, introduce un dato válido (mín. 3 carateceres)."
            onInput={inputHandler}
            initialValue={name}
            initialValid={true}
          />
          <div>
            <Button to="/user/admin/business/manage">VOLVER</Button>
            <Button type="submit">ACTUALIZAR</Button>
          </div>
        </form>
      </Card>

      <Modal
        show={errorNameExists}
        onCancel={cancelNameError}
        footer={
          <Button type="button" onClick={cancelNameError}>
            OK
          </Button>
        }
      >
        <p>Ya existe una empresa con ese nombre</p>
      </Modal>

      <Modal
        show={showModalOk}
        footer={<Button to="/user/admin/business">OK</Button>}
      >
        <p>Empresa actualizada correctamente</p>
      </Modal>
    </>
  );
};

export default UpdateBusiness;
