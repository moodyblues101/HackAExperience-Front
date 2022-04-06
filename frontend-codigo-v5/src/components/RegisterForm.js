import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../store/auth-context";
import "./AuthForm.css";

const RegisterForm = () => {
  const history = useHistory();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const bioInputRef = useRef();
  const passwordInputRef = useRef();
  const repeatedPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  //   const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //   const switchAuthModeHandler = () => {
  //     setIsLogin((prevState) => !prevState);
  //   };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredBio = bioInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredRepeatedPassword = repeatedPasswordInputRef.current.value;

    // optional: add validations

    // if (enteredPassword ==! enteredRepeatedPassword) {
    //     return;
    // }

    setIsLoading(true);
    let url;
    // if (isLogin) {
    //   url = "http://localhost:3000/api/v1/users/login";
    // } else {
    url = "http://localhost:3000/api/v1/users";
    // }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        name: enteredName,
        email: enteredEmail,
        bio: enteredBio,
        password: enteredPassword,
        repeatPassword: enteredRepeatedPassword,
        // returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          // console.log(res);
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        // const expirationTime = new Date(
        //   new Date().getTime() + +data.expiresIn * 1000
        // );
        // authCtx.login(data.accessToken, expirationTime.toISOString());
        const userId = data.id;
        history.replace(`/user/:${userId}`);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className="auth">
      {/* <h1>{isLogin ? "Login" : "Sign Up"}</h1> */}
      <h1>Registrate</h1>
      <form onSubmit={submitHandler}>
        <div className="control">
          <label htmlFor="name">Tu nombre</label>
          <input type="text" id="name" required ref={nameInputRef} />
        </div>
        <div className="control">
          <label htmlFor="email">Tu Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className="control">
          <label htmlFor="bio">Algo sobre ti</label>
          <textarea id="bio" required ref={bioInputRef} />
        </div>
        <div className="control">
          <label htmlFor="password">Tu contraseña</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className="control">
          <label htmlFor="repeatedPassword">Repite la contraseña</label>
          <input
            type="password"
            id="repeatedPassword"
            required
            ref={repeatedPasswordInputRef}
          />
        </div>
        <div className="actions">
          {!isLoading && (
            // <button>{isLogin ? "Login" : "Create Account"}</button>
            <button>Crea tu cuenta</button>
          )}
          {isLoading && <p>Sending request</p>}
          <button
            type="button"
            className="toggle"
            // onClick={switchAuthModeHandler}
          >
            {/* {isLogin ? "Create new account" : "Login with existing account"} */}
          </button>
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
