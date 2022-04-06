import { Routes, Route, Link } from "react-router-dom";

import AddAvatar from "./UserPageMenu/AddAvatar";
import AddName from "./UserPageMenu/AddName";
import AddBio from "./UserPageMenu/AddBio";
import ChangePassword from "./UserPageMenu/ChangePassword";

const UserPersonalPage = () => {
  return (
    <div>
      <h2>Datos personales</h2>
      <ul>
        <li>
          <Link to="avatar">Añadir avatar</Link>
        </li>
        <li>
          <Link to="name">Nombre</Link>
        </li>
        <li>
          <Link to="bio">Bio</Link>
        </li>
        <li>
          <Link to="password">Cambiar contraseña</Link>
        </li>
      </ul>
      <Routes>
        <Route path="avatar" element={<AddAvatar />} />
        <Route path="name" element={<AddName />} />
        <Route path="bio" element={<AddBio />} />
        <Route path="password" element={<ChangePassword />} />
      </Routes>
    </div>
  );
};

export default UserPersonalPage;
