import { useState, useRef } from "react";
import "./style.css";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { useHistory } from "react-router";
import EditableAvatar from "../EditableAvatar";
import { toast } from "react-toastify";

const EditUserForm = ({ userId, userAvatar, oldEmail, oldName }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useUserTokenContext();
  const history = useHistory();
  const imageInputRef = useRef();

  const updateUser = async (e) => {
    e.preventDefault();

    const newUser = new FormData();
    const newAvatar = imageInputRef.current.files[0];

    newUser.append("email", email || oldEmail);
    newUser.append("name", name || oldName);
    if (newAvatar) {
      newUser.append("avatar", newAvatar);
    }

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
        },
        body: newUser,
      }
    );

    if (res.ok) {
      if (email) {
        const body = await res.json();
        toast.success(body.message);
        setToken("");
      } else {
        history.go();
      }
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  return (
    <>
      <form className="edit_user_form form" onSubmit={updateUser}>
        <EditableAvatar
          userId={userId}
          avatar={userAvatar}
          name={oldName}
          imageInputRef={imageInputRef}
        />
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
            placeholder={oldEmail}
          />
        </div>
        <div className="input_container">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder={oldName}
          />
        </div>
        <input type="submit" value="Guardar cambios" />
      </form>
    </>
  );
};

export default EditUserForm;
