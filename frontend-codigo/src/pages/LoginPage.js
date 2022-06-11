import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";

import Card from "../ui/Card";
import Input from "../ui/FormElements/Input";
import Button from "../ui/FormElements/Button";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../util/validators";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import "./LoginPage.css";

const LoginPage = () => {
  const history = useHistory();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const idExp = query.get("experience");
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        "http://localhost:3000/api/v1/users/login",
        "POST",
        JSON.stringify({
          username: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(responseData.id, responseData.role, responseData.accessToken);

      if (responseData.role !== "administrador") {
        if (idExp) {
          history.replace(`/experiences/${idExp}`);
        } else {
          history.replace("/");
        }
      } else {
        history.replace("/user/admin/");
      }
    } catch (err) { }
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="auth">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Iniciar sesión</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Por favor, introduzca un email válido."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Contraseña"
            validators={[VALIDATOR_MINLENGTH(4)]}
            errorText="Por favor, introduzca una contraseña válida (min. 4 caracteres)."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            LOGIN
          </Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default LoginPage;
