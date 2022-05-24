import { Route, Routes, Link } from "react-router-dom";

import PastExperiences from "./UserPageMenu/PastExperiences";
import EnrolledExperiences from "./UserPageMenu/EnrolledExperiences";
import AddReview from "./UserPageMenu/AddReview";

const UserExperiencesPage = () => {
  return (
    <div>
      <h2>Experiencias</h2>
      <ul>
        <li>
          <Link to="past">Experiencias pasadas</Link>
        </li>
        <li>
          <Link to="enrolled">Experiencias en las que apareces inscrito</Link>
        </li>
        <li>
          <Link to="comment">Añadir comentario</Link>
        </li>
      </ul>
      <Routes>
        <Route path="past" element={<PastExperiences />} />
        <Route path="enrolled" element={<EnrolledExperiences />} />
        <Route path="comment" element={<AddReview />} />
      </Routes>
    </div>
  );
};

export default UserExperiencesPage;
