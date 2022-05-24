//URL: http://localhost:3000/user/:userId/personal/password

import { useState, useRef, useContext } from "react";
// import { useHistory } from "react-router-dom";

// import AuthContext from "../../store/auth-context";

const ChangePassword = () => {
  // const history = useHistory();
  const newPasswordInputRef = useRef();
  const newRepeatedPasswordInputRef = useRef();
  // const authCtx = useContext(AuthContext);

  const [error, setError] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredNewRepeatedPassword =
      newRepeatedPasswordInputRef.current.value;

    console.log(enteredNewPassword);
    console.log(enteredNewRepeatedPassword);

    const newPasswordIsValid = enteredNewPassword && enteredNewRepeatedPassword;
    // este if no funciona!!
    if (!newPasswordIsValid) {
      setError("no son iguales");
      console.log(error);
      return;
    }

    //add validation

    fetch("http://localhost:3000/api/v1/users", {
      method: "PATCH",
      body: JSON.stringify({
        // idToken: authCtx.token,
        password: enteredNewPassword,
        repeatPassword: enteredNewPassword,
        // returnSecureToken: false,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }) //.then => manejar error como en authForm.js. En lugar de eso, se pone length min 7
      .then((res) => {
        //assumption: Always succeeds!!
        // history.replace("/");
      });
  };

  return (
    <div>
      <h2>Cambiar contraseña</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="new-password">Nuevo Password</label>
          <input type="password" id="new-password" ref={newPasswordInputRef} />
        </div>
        <div>
          <label htmlFor="new-rep-password">Repetir Password</label>
          <input
            type="password"
            id="new-rep-password"
            ref={newRepeatedPasswordInputRef}
          />
        </div>
        <div>
          <button>Change Password</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
