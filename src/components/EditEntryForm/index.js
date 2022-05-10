import "./style.css";
import { useState } from "react";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import PhotosSlider from "../PhotosSlider";

const EditEntryForm = ({ id, place, description, photos, setRefetchEntry }) => {
  const [newPlace, setNewPlace] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [token] = useUserTokenContext();
  const history = useHistory();

  const editEntry = async (e) => {
    e.preventDefault();

    const newEntry = {
      place: newPlace || place,
      description: newDescription || description,
    };

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/entries/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      }
    );

    if (res.ok) {
      history.go();
    } else {
      const error = await res.json();
      toast.error(error.message);
    }
  };

  return (
    <>
      <form className="edit_entry_form form" onSubmit={editEntry}>
        <div className="input_container">
          <label htmlFor="edit_entry_form_place">Place</label>
          <input
            id="edit_entry_form_place"
            name="edit_entry_form_place"
            value={newPlace}
            onChange={(e) => {
              setNewPlace(e.target.value);
            }}
            placeholder={place}
          />
        </div>
        <div className="input_container">
          <label htmlFor="edit_entry_form_description">Description</label>
          <input
            id="edit_entry_form_description"
            name="edit_entry_form_description"
            value={newDescription}
            onChange={(e) => {
              setNewDescription(e.target.value);
            }}
            placeholder={description}
          />
        </div>

        {photos && (
          <PhotosSlider
            entryId={id}
            entryPhotos={photos}
            entryPlace={place}
            token={token}
            setRefetchEntry={setRefetchEntry}
            isEditable
          />
        )}

        <input type="submit" value="Editar entrada" />
      </form>
    </>
  );
};

export default EditEntryForm;
