import "./style.css";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useUserTokenContext();

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (res.ok) {
      const body = await res.json();
      setToken(body.data.token);
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <form className="login_form form" onSubmit={login}>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default LoginForm;
