import { Route, Routes } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CategoryPage from "./pages/CategoryPage";
import ExperiencePage from "./pages/ExperiencePage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFoundPage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";

import MainNavigation from "./ui/MainNavigation";
import MainHeader from "./ui/MainHeader";

function App() {
  return (
    <div>
      <MainHeader />
      <MainNavigation />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:idCategory" element={<CategoryPage />} />
        <Route path="/experiences" element={<ExperiencePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/admin/*" element={<AdminPage />} />
        <Route path="/user/:userId/*" element={<UserPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
