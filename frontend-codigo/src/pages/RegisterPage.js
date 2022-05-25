import React, { useState } from "react";

import Card from "../ui/Card";
import Input from "../ui/FormElements/Input";
import Button from "../ui/FormElements/Button";
import Modal from "../ui/Modal";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../util/validators";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import "./LoginPage.css";

const RegisterPage = () => {
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      verifyPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("email", formState.inputs.email.value);
      formData.append("password", formState.inputs.password.value);
      formData.append("verifyPassword", formState.inputs.verifyPassword.value);

      await sendRequest("http://localhost:3000/api/v1/users", "POST", formData);

      setShowConfirmEmail(true);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="auth">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Registro</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="name"
            type="text"
            label="Nombre"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce un nombre."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Por favor, introduce una dirección de e-mail."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Contraseña"
            validators={[VALIDATOR_MINLENGTH(4)]}
            errorText="Por favor, introduce una contraseña (min. 4 caracteres)."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="verifyPassword"
            type="password"
            label="Repite la contraseña"
            validators={[VALIDATOR_MINLENGTH(4)]}
            errorText="Repite la contraseña."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            REGÍSTRATE
          </Button>
        </form>
      </Card>
      <Modal
        show={showConfirmEmail}
        footer={
          <div>
            <Button to="/">OK</Button>
          </div>
        }
      >
        <p>Te hemos enviado un email para que confirmes tu registro.</p>
      </Modal>
    </React.Fragment>
  );
};

export default RegisterPage;
