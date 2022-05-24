import React, { useContext } from "react";

import Card from "../ui/Card";
import Input from "../ui/FormElements/Input";
import Button from "../ui/FormElements/Button";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
// import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../util/validators";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import "./LoginPage.css";

const RegisterPage = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      // bio: {
      //   value: "",
      //   isValid: false,
      // },
      password: {
        value: "",
        isValid: false,
      },
      verifyPassword: {
        value: "",
        isValid: false,
      },
      // image: {
      //   value: null,
      //   isValid: false,
      // },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("email", formState.inputs.email.value);
      // formData.append("bio", 'añade tu bio');
      formData.append("password", formState.inputs.password.value);
      formData.append("verifyPassword", formState.inputs.verifyPassword.value);
      // formData.append("image", formState.inputs.image.value);
      const responseData = await sendRequest(
        "http://localhost:3000/api/v1/users",
        "POST",
        formData
      );

      auth.login(responseData.userId, responseData.token);
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
          {/* <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please provide an image."
            /> */}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Por favor, introduce una dirección de e-mail."
            onInput={inputHandler}
          />
          {/* <Input
            element="textarea"
            id="bio"
            type="text"
            label="Cuentanos algo de ti:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce un texto cortito sobre ti."
            onInput={inputHandler}
          /> */}
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
            label="Password"
            validators={[VALIDATOR_MINLENGTH(4)]}
            errorText="Repite la contraseña."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            REGÍSTRATE
          </Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default RegisterPage;
