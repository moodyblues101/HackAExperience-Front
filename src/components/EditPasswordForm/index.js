import "./style.css";
import { useState, useEffect } from "react";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { Redirect } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const EditPasswordForm = ({ userId }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [doPasswordsMatch, setDoPasswordMatch] = useState(false);
  const [token, setToken] = useUserTokenContext();

  useEffect(() => {
    if (newPassword === repeatNewPassword) {
      setDoPasswordMatch(true);
    } else {
      setDoPasswordMatch(false);
    }
  }, [newPassword, repeatNewPassword]);

  const editPassword = async (e) => {
    e.preventDefault();

    if (!doPasswordsMatch) {
      return;
    }

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/password`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      }
    );

    if (res.ok) {
      toast.success("Contraseña actualizada, inicia sesión de nuevo");
      setToken("");
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <form className="edit_password_form form" onSubmit={editPassword}>
        <div className="input_container">
          <label htmlFor="oldPassword">Contraseña actual</label>
          <input
            id="oldPassword"
            name="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </div>
        <div className="input_container">
          <label htmlFor="newPassword">Contraseña nueva</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>
        <div className="input_container">
          <label htmlFor="repeatNewPassword">Repetir contraseña nueva</label>
          <input
            id="repeatNewPassword"
            name="repeatNewPassword"
            type="password"
            value={repeatNewPassword}
            onChange={(e) => {
              setRepeatNewPassword(e.target.value);
            }}
          />

          <FontAwesomeIcon
            className="password_match"
            icon={doPasswordsMatch ? faCheckCircle : faTimesCircle}
          />
        </div>

        <input type="submit" value="Cambiar contraseña" />
      </form>
    </>
  );
};

export default EditPasswordForm;
