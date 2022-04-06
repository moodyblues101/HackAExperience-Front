import { Route, Routes, Link } from "react-router-dom";

import CreateNewExperience from "./AdminPageMenu/CreateNewExperience";
import ModifyExperience from "./AdminPageMenu/ModifyExperience";
import DeleteExperience from "./AdminPageMenu/DeleteExperience";
import ManageExperienceReviews from "./AdminPageMenu/ManageExperienceReviews";
import AddImagesExperience from "./AdminPageMenu/AddImagesExperience";

import classes from "./AdminPage.module.css";

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <ul>
        <li>
          <Link to="new-experience">
            <span className={classes.span}></span>Añadir experiencia
          </Link>
        </li>
        <li>
          <Link to="modify-experience">Modificar experiencia</Link>
        </li>
        <li>
          <Link to="delete-experience">Borrar experiencia</Link>
        </li>
        <li>
          <Link to="manage-experience-comments">Gestionar comentarios</Link>
        </li>
      </ul>

      <Routes>
        <Route path="new-experience" element={<CreateNewExperience />} />
        <Route
          path="new-experience/addImages"
          element={<AddImagesExperience />}
        />
        <Route path="modify-experience" element={<ModifyExperience />} />
        <Route path="delete-experience" element={<DeleteExperience />} />
        <Route
          path="manage-experience-comments"
          element={<ManageExperienceReviews />}
        />
      </Routes>
    </div>
  );
};

export default AdminPage;
