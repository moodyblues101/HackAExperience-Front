import "./style.css";
import Avatar from "../Avatar";
import formatEmail from "../../helpers/formatEmail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import EditUserForm from "../EditUserForm";
import { Link } from "react-router-dom";

const UserProfile = ({ id, name, avatar, email }) => {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <div className="user_profile">
      {!isEditable ? (
        <>
          <Avatar name={name} avatar={avatar} />
          <div className="user_email">
            <p>Email:</p>
            <span>{email}</span>
          </div>
          <div className="user_name">
            <p>Nombre:</p>
            <span>{name || formatEmail(email)}</span>
          </div>
          <Link className="edit_password" to="/editPassword">
            Cambiar contraseña
          </Link>
          <FontAwesomeIcon
            className="edit_profile"
            icon={faPencilAlt}
            onClick={() => {
              setIsEditable(true);
            }}
          />
        </>
      ) : (
        <>
          <EditUserForm
            userId={id}
            userAvatar={avatar}
            oldEmail={email}
            oldName={name}
          />

          <FontAwesomeIcon
            className="go_back"
            icon={faArrowAltCircleLeft}
            onClick={() => setIsEditable(false)}
          />
        </>
      )}
    </div>
  );
};

export default UserProfile;
