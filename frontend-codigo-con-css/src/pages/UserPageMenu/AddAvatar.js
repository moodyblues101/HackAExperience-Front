import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from "../../hooks/http-hook";
import { AuthContext } from "../../store/auth-context";
import ErrorModal from "../../ui/ErrorModal";
import Card from "../../ui/Card";
import ImageUpload from "../../ui/FormElements/ImageUpload";
import Button from "../../ui/FormElements/Button";

const AddAvatar = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      profileImage: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  async function addAvatarUser(event) {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("profileImage", formState.inputs.profileImage.value);
      await sendRequest(
        "http://localhost:3000/api/v1/users/upload",
        "POST",
        formData,
        { Authorization: "Bearer " + auth.token }
      );
      history.replace(`/user/${auth.userId}/personal`);
    } catch (err) {}
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card>
        <h2>Añade tu avatar</h2>
        <hr />
        <form onSubmit={addAvatarUser}>
          <ImageUpload
            center
            id="profileImage"
            onInput={inputHandler}
            errorText="Por favor, seleccione una imagen."
          />
          <Button type="submit">AÑADIR AVATAR</Button>
        </form>
        <div style={{ marginTop: "2rem" }}>
          <Button to={`/user/${auth.userId}/personal`}>VOLVER</Button>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default AddAvatar;
