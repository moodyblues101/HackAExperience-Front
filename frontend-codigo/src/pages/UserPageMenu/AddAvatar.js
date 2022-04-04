import { useState } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";

//URL: http://localhost:3000/user/:userId/avatar

const AddAvatar = () => {
  // const params = useParams();
  const [fichero, setFichero] = useState();
  const [avatarUrl, setAvatarUrl] = useState();
  // const [error, setError] = useState();

  // const idUser = params.userId; //no se como pasarlo al backend

  async function addAvatarUser(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("avatarFile", fichero);

    const response = await axios.post(
      "http://localhost:3000/api/v1/users/upload",
      fichero
    );

    setAvatarUrl(response.data.avatarUrl);
  }

  return (
    <div>
      <h1>Añadir avatar</h1>
      <form onSubmit={addAvatarUser}>
        <div>
          <label>
            Imagen de perfil:{" "}
            <input
              // multiple
              type={"file"}
              onChange={(event) => {
                const fichero = event.target.files[0];
                setFichero(fichero);
              }}
            />
          </label>
        </div>
        <div>
          <button>Subir fichero</button>
        </div>
      </form>

      {avatarUrl && (
        <div>
          <h2>Avatar subido</h2>
          <img src={avatarUrl} alt="avatarUrl" />{" "}
        </div>
      )}
    </div>
  );
};

export default AddAvatar;
