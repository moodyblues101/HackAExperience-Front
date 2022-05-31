import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../ui/FormElements/Input";
import Button from "../../ui/FormElements/Button";
import LoadingSpinner from "../../ui/LoadingSpinner";
import ErrorModal from "../../ui/ErrorModal";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../util/validators";
import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../store/auth-context";
import { useParams } from "react-router-dom";

const ChangePassword = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const userId = useParams().userId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      password: {
        value: "",
        isValid: false,
      },
      repeatedPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const passwordUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    if (
      formState.inputs.password.value !==
      formState.inputs.repeatedPassword.value
    ) {
      throw new Error(
        "Compruebe que ha introducido los mismos valores en ambos campos"
      );
    }

    try {
      await sendRequest(
        "http://localhost:3000/api/v1/users/password",
        "PATCH",
        JSON.stringify({
          password: formState.inputs.password.value,
          repeatPassword: formState.inputs.repeatedPassword.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.replace(`/user/${userId}/personal`);
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && (
        <form className="place-form" onSubmit={passwordUpdateSubmitHandler}>
          <Input
            id="password"
            element="input"
            type="password"
            label="Contraseña"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(4)]}
            errorText="Por favor, introduce una contraseña válida (de al menos 4 caracteres)."
            onInput={inputHandler}
            initialValue=""
            initialValid={true}
          />
          <Input
            id="repeatedPassword"
            element="input"
            type="password"
            label="Repetir contraseña"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(4)]}
            errorText="Por favor, introduce una contraseña válida (de al menos 4 caracteres)."
            onInput={inputHandler}
            initialValue=""
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            ACTUALIZAR CONTRASEÑA
          </Button>
          <Button to={`/user/${userId}/personal`}>CANCELAR</Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default ChangePassword;
