import "./style.css";
import { useState, useRef } from "react";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import PreviewPhotosSlider from "../PreviewPhotosSlider";

const CreateEntryForm = () => {
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const filesInputRef = useRef();
  const [token] = useUserTokenContext();
  const history = useHistory();

  const createEntry = async (e) => {
    e.preventDefault();

    const files = filesInputRef.current.files;

    if (files.length > 3) {
      toast.error("Máximo 3 fotos por entrada");
      return;
    }

    const payload = new FormData();

    payload.append("place", place);
    payload.append("description", description);

    for (let i = 0; i < files.length; i++) {
      payload.append(`file${i}`, files[i]);
    }

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/entries`, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: payload,
    });

    if (res.ok) {
      const body = await res.json();
      toast.success("¡Entrada creada!");
      history.push(`/entry/${body.data.id}`);
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  return (
    <>
      <form className="create_entry_form form" onSubmit={createEntry}>
        <div className="input_container">
          <label htmlFor="entry_form_place">Place</label>
          <input
            id="entry_form_place"
            name="entry_form_place"
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
            }}
          />
        </div>
        <div className="input_container">
          <label htmlFor="entry_form_description">Description</label>
          <input
            id="entry_form_description"
            name="entry_form_description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <PreviewPhotosSlider filesInputRef={filesInputRef} entryPlace={place} />

        <input type="submit" value="Crear entrada" />
      </form>
    </>
  );
};

export default CreateEntryForm;
