import React, { useState, useContext } from "react";

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
  // const [isLoginMode, setIsLoginMode] = useState(true);
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
      bio: {
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
      // image: {
      //   value: null,
      //   isValid: false,
      // },
    },
    false
  );

  // const switchModeHandler = () => {
  // if (!isLoginMode) {
  //   setFormData(
  //     {
  //       ...formState.inputs,
  //       name: undefined,
  //       image: undefined,
  //     },
  //     formState.inputs.email.isValid && formState.inputs.password.isValid
  //   );
  // } else {
  //     setFormData(
  //       {
  //         ...formState.inputs,
  //         name: {
  //           value: "",
  //           isValid: false,
  //         },
  //         image: {
  //           value: null,
  //           isValid: false,
  //         },
  //       },
  //       false
  //     );
  //   // }
  //   setIsLoginMode((prevMode) => !prevMode);
  // };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    // if (isLoginMode) {
    // try {
    //   const responseData = await sendRequest(
    //     "http://localhost:5000/api/users/login", //CAMBIAR!!!
    //     "POST",
    //     JSON.stringify({
    //       email: formState.inputs.email.value,
    //       password: formState.inputs.password.value,
    //     }),
    //     {
    //       "Content-Type": "application/json",
    //     }
    //   );
    //   auth.login(responseData.userId, responseData.token);
    // } catch (err) {}
    // } else {
    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("email", formState.inputs.email.value);
      formData.append("bio", formState.inputs.bio.value);
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
    // }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Registro</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
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
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="textarea"
            id="bio"
            type="text"
            label="Your Bio"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter something about you."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(4)]}
            errorText="Please enter a valid password, at least 4 characters."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="verifyPassword"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(4)]}
            errorText="Repeat password."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            REGISTRATE
            {/* {isLoginMode ? "LOGIN" : "SIGNUP"} */}
          </Button>
        </form>
        {/* <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
        </Button> */}
      </Card>
    </React.Fragment>
  );
};

export default RegisterPage;
