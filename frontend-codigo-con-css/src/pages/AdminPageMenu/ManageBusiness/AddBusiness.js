import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { useForm } from "../../../hooks/form-hook";
import { useHttpClient } from "../../../hooks/http-hook";
import { AuthContext } from "../../../store/auth-context";
import Button from "../../../ui/FormElements/Button";
import Input from "../../../ui/FormElements/Input";
import Modal from "../../../ui/Modal";
import ErrorModal from "../../../ui/ErrorModal";
import LoadingSpinner from "../../../ui/LoadingSpinner";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../util/validators";

import "./AddBusiness.css";

const AddBusiness = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [isAdded, setIsAdded] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: { value: "", isValid: false },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:3000/api/v1/business/",
        "POST",
        JSON.stringify({ name: formState.inputs.name.value }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setIsAdded(true);
    } catch (err) {}
  };

  const cancelHandler = () => {
    setIsAdded(false);
    history.push("/user/admin/business");
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div className="add-business-container">
        <h2>Añadir datos empresa</h2>
        <div className="form-add-business">
          <form onSubmit={submitHandler}>
            <div className="form-input">
              <Input
                id="name"
                element="input"
                type="text"
                label="Introduzca el nombre de la empresa:"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
                errorText="Por favor, introduzca un nombre válido (mínimo 3 caracteres)"
                onInput={inputHandler}
              />
            </div>
            <div>
              <Button to="/user/admin/business">VOLVER</Button>
              <Button type="submit" disabled={!formState.isValid}>
                GUARDAR
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        show={isAdded}
        onCancel={cancelHandler}
        footer={
          <Button type="button" onClick={cancelHandler}>
            OK
          </Button>
        }
      >
        <p>Empresa añadida correctamente</p>
      </Modal>
    </>
  );
};

export default AddBusiness;
