import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../store/auth-context";
import "./AuthForm.css";

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  // const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // const switchAuthModeHandler = () => {
  //   setIsLogin((prevState) => !prevState);
  // };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: add validations

    setIsLoading(true);
    let url;
    // if (isLogin) {
    url = "http://localhost:3000/api/v1/users/login";
    // } else {
    //   url = "http://localhost:3000/api/v1/users";
    // }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        username: enteredEmail,
        password: enteredPassword,
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
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        //añado id de usuario y role para poder usarlo en otras paginas
        authCtx.login(
          data.id,
          data.role,
          data.accessToken,
          expirationTime.toISOString()
        );
        if (data.role === "admin") {
          history.replace("/user/admin/");
        } else {
          history.replace("/");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className="auth">
      {/* <h1>{isLogin ? "Login" : "Sign Up"}</h1> */}
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className="control">
          <label htmlFor="email">Tu Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
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
        <div className="actions">
          {!isLoading && (
            // <button>{isLogin ? "Login" : "Create Account"}</button>
            <button>Login</button>
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

export default AuthForm;
