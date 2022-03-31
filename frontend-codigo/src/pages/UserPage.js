import { Route, Routes, Link } from "react-router-dom";

import UserPersonalPage from "./UserPersonalPage";
import UserExperiencesPage from "./UserExperiencesPage";

const UserPage = () => {
  return (
    <div>
      <h1>User Page</h1>
      <ul>
        <li>
          <Link to="personal">Datos Personales</Link>
        </li>
        <li>
          <Link to="experiences">Experiencias</Link>
        </li>
      </ul>
      <Routes>
        <Route path="personal/*" element={<UserPersonalPage />} />
        <Route path="experiences/*" element={<UserExperiencesPage />} />
      </Routes>
    </div>
  );
};

export default UserPage;
