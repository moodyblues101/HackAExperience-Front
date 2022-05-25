<<<<<<< HEAD
import React, { useContext } from "react";
=======
import React, { useState } from "react";
>>>>>>> 289609200467aa78a5a42178316a21d57aae38c0

import Card from "../ui/Card";
import Input from "../ui/FormElements/Input";
import Button from "../ui/FormElements/Button";
<<<<<<< HEAD
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
// import ImageUpload from '../../shared/components/FormElements/ImageUpload';
=======
import Modal from "../ui/Modal";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
>>>>>>> 289609200467aa78a5a42178316a21d57aae38c0
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../util/validators";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
<<<<<<< HEAD
import { AuthContext } from "../store/auth-context";
import "./LoginPage.css";

const RegisterPage = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
=======
import "./LoginPage.css";

const RegisterPage = () => {
  const [showConfirmEmail, setShowConfirmEmail] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
>>>>>>> 289609200467aa78a5a42178316a21d57aae38c0
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
<<<<<<< HEAD
      // bio: {
      //   value: "",
      //   isValid: false,
      // },
=======
>>>>>>> 289609200467aa78a5a42178316a21d57aae38c0
      password: {
        value: "",
        isValid: false,
      },
      verifyPassword: {
        value: "",
        isValid: false,
      },
<<<<<<< HEAD
      // image: {
      //   value: null,
      //   isValid: false,
      // },
=======
>>>>>>> 289609200467aa78a5a42178316a21d57aae38c0
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("email", formState.inputs.email.value);
<<<<<<< HEAD
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
=======
      formData.append("password", formState.inputs.password.value);
      formData.append("verifyPassword", formState.inputs.verifyPassword.value);

      await sendRequest("http://localhost:3000/api/v1/users", "POST", formData);

      setShowConfirmEmail(true);
>>>>>>> 289609200467aa78a5a42178316a21d57aae38c0
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
<<<<<<< HEAD
          {/* <ImageUpload
              center
              id="image"
              onInput={inputHandler}
              errorText="Please provide an image."
            /> */}
=======
>>>>>>> 289609200467aa78a5a42178316a21d57aae38c0
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Por favor, introduce una dirección de e-mail."
            onInput={inputHandler}
          />
<<<<<<< HEAD
          {/* <Input
            element="textarea"
            id="bio"
            type="text"
            label="Cuentanos algo de ti:"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduce un texto cortito sobre ti."
            onInput={inputHandler}
          /> */}
=======
>>>>>>> 289609200467aa78a5a42178316a21d57aae38c0
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
<<<<<<< HEAD
            label="Password"
=======
            label="Repite la contraseña"
>>>>>>> 289609200467aa78a5a42178316a21d57aae38c0
            validators={[VALIDATOR_MINLENGTH(4)]}
            errorText="Repite la contraseña."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            REGÍSTRATE
          </Button>
        </form>
      </Card>
<<<<<<< HEAD
=======
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
>>>>>>> 289609200467aa78a5a42178316a21d57aae38c0
    </React.Fragment>
  );
};

export default RegisterPage;
