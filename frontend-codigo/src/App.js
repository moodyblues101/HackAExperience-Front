import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CategoryPage from "./pages/CategoryPage";
import ExperiencePage from "./pages/ExperiencePage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFoundPage";

import AdminPage from "./pages/AdminPage";
import CreateNewExperience from "./pages/AdminPageMenu/CreateNewExperience";
import ModifyExperience from "./pages/AdminPageMenu/ModifyExperience";
import DeleteExperience from "./pages/AdminPageMenu/DeleteExperience";
import ManageExperienceReviews from "./pages/AdminPageMenu/ManageExperienceReviews";
import UserPersonalPage from "./pages/UserPersonalPage";
import UserExperiencesPage from "./pages/UserExperiencesPage";

import UserPage from "./pages/UserPage";
import AddAvatar from "./pages/UserPageMenu/AddAvatar";
import AddName from "./pages/UserPageMenu/AddName";
import AddBio from "./pages/UserPageMenu/AddBio";
import ChangePassword from "./pages/UserPageMenu/ChangePassword";
import PastExperiences from "./pages/UserPageMenu/PastExperiences";
import EnrolledExperiences from "./pages/UserPageMenu/EnrolledExperiences";
import AddReview from "./pages/UserPageMenu/AddReview";

import { AuthContext } from "./store/auth-context";
import { useAuth } from "./hooks/auth-hook";
import MainHeader from "./ui/Navigation/MainHeader";
import MainNavigation from "./ui/Navigation/MainNavigation";
import Footer from "./ui/Navigation/Footer";

function App() {
  const { token, login, logout, userId, userRole } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/user/admin/" exact>
          <AdminPage />
        </Route>
        <Route path="/user/admin/new-experience" exact>
          <CreateNewExperience />
        </Route>
        <Route path="/user/admin/modify-experience" exact>
          <ModifyExperience />
        </Route>
        <Route path="/user/admin/delete-experience" exact>
          <DeleteExperience />
        </Route>
        <Route path="/user/admin/manage-experience-comments" exact>
          <ManageExperienceReviews />
        </Route>

        <Route path="/user/:userId" exact>
          <UserPage />
        </Route>
        <Route path="/user/:userId/personal" exact>
          <UserPersonalPage />
        </Route>
        <Route path="/user/:userId/personal/avatar" exact>
          <AddAvatar />
        </Route>
        <Route path="/user/:userId/personal/name" exact>
          <AddName />
        </Route>
        <Route path="/user/:userId/personal/bio" exact>
          <AddBio />
        </Route>
        <Route path="/user/:userId/personal/password" exact>
          <ChangePassword />
        </Route>

        <Route path="/user/:userId/experiences" exact>
          <UserExperiencesPage />
        </Route>
        <Route path="/user/:userId/experiences/past" exact>
          <PastExperiences />
        </Route>
        <Route path="/user/:userId/experiences/enrolled" exact>
          <EnrolledExperiences />
        </Route>
        <Route path="/user/:userId/experiences/review" exact>
          <AddReview />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/experiences">
          <ExperiencePage />
        </Route>
        <Route path="/search">
          <SearchPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/:idCategory">
          <CategoryPage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userRole: userRole,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainHeader />
        {userRole !== "administrador" && <MainNavigation />}
        <main>{routes}</main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;