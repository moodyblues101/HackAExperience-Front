import "./style.css";
import { useState } from "react";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);

  const register = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setDone(true);
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  return (
    <>
      {!done ? (
        <form className="register_form form" onSubmit={register}>
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
          <input type="submit" value="Registrarse" />
        </form>
      ) : (
        <div className="register_confirmation">
          Te has registrado correctamente. Revisa tu correo para validar tu
          cuenta
        </div>
      )}
    </>
  );
};

export default RegisterForm;
