import { useState } from "react";

import axios from "axios";

const AddImagesExperience = () => {
  const [file, setFile] = useState(null);

  const fileUploadHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("sampleFile", file);

    const idExperience = 3;

    const responseImage = await axios.post(
      `http://localhost:3000/api/v1/experiences/${idExperience}/images`,
      formData
    );

    if (!responseImage.ok) {
      throw new Error("uploaded images went wrong");
    }
  };

  return (
    <>
      <h2>Añadir imagenes</h2>
      <div>
        <label>
          Imagene(s):
          <input
            multiple
            type="file"
            onChange={(event) => {
              const file = event.target.files[0];
              setFile(file);
            }}
          />
          <button onClick={fileUploadHandler}>Subir</button>
        </label>
      </div>
    </>
  );
};

export default AddImagesExperience;
