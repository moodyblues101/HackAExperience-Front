import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import CategoryPage from "./pages/CategoryPage";
import BookingPage from "./pages/BookingPage";
import ExperiencePage from "./pages/ExperiencePage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AcercadePage from "./pages/AcercaDePage";
import NotFound from "./pages/NotFoundPage";

import AdminPage from "./pages/AdminPage";
import CreateNewExperience from "./pages/AdminPageMenu/CreateNewExperience";
import ModifyExperience from "./pages/AdminPageMenu/ModifyExperience";
import DeleteExperience from "./pages/AdminPageMenu/DeleteExperience";
import ManageExperienceReviews from "./pages/AdminPageMenu/ManageExperienceReviews";
import ManageExperienceReviewsByUser from "./pages/AdminPageMenu/ManageReviews/ManageExperienceReviewsByUser";
import ManageExperienceReviewsByExperience from "./pages/AdminPageMenu/ManageReviews/ManageExperienceReviewsByExperience";
import ManageExperienceReviewsByUserAndExperience from "./pages/AdminPageMenu/ManageReviews/ManageExperienceReviewsByUserAndExperience";
import UserPersonalPage from "./pages/UserPersonalPage";
import UserExperiencesPage from "./pages/UserExperiencesPage";
import ManageBusiness from "./pages/AdminPageMenu/ManageBusiness";
import AddBusiness from "./pages/AdminPageMenu/ManageBusiness/AddBusiness";
import HandleBusiness from "./pages/AdminPageMenu/ManageBusiness/HandleBusiness";

import UserPage from "./pages/UserPage";
import AddAvatar from "./pages/UserPageMenu/AddAvatar";
import AddName from "./pages/UserPageMenu/AddName";
import AddBio from "./pages/UserPageMenu/AddBio";
import ChangePassword from "./pages/UserPageMenu/ChangePassword";
import DeleteUser from "./pages/UserPageMenu/DeleteUser";
import PastExperiences from "./pages/UserPageMenu/PastExperiences";
import EnrolledExperiences from "./pages/UserPageMenu/EnrolledExperiences";

import { AuthContext } from "./store/auth-context";
import { useAuth } from "./hooks/auth-hook";
import MainNavigation from "./ui/Navigation/MainNavigation";
import Footer from "./ui/Navigation/Footer";

function App() {
  const { token, login, logout, userId, userRole } = useAuth();

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
        <MainNavigation />
        <main>
          <Switch>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            <Route path="/search" exact>
              <SearchPage />
            </Route>
            <Route path="/login" exact>
              <LoginPage />
            </Route>
            <Route path="/register" exact>
              <RegisterPage />
            </Route>
            <Route path="/acercade" exact>
              <AcercadePage />
            </Route>
            <Route path="/category/:catName/:idCategory" exact>
              <CategoryPage />
            </Route>
            <Route path="/experiences/:idExp" exact>
              <ExperiencePage />
            </Route>
            {userRole === "administrador" && (
              <Route path="/user/admin/" exact>
                <AdminPage />
              </Route>
            )}
            {userRole === "administrador" && (
              <Route path="/user/admin/new-experience" exact>
                <CreateNewExperience />
              </Route>
            )}
            {userRole === "administrador" && (
              <Route path="/user/admin/modify-experience" exact>
                <ModifyExperience />
              </Route>
            )}
            {userRole === "administrador" && (
              <Route path="/user/admin/delete-experience" exact>
                <DeleteExperience />
              </Route>
            )}
            {userRole === "administrador" && (
              <Route path="/user/admin/manage-experience-comments" exact>
                <ManageExperienceReviews />
              </Route>
            )}
            {userRole === "administrador" && (
              <Route path="/user/admin/manage-experience-comments/user" exact>
                <ManageExperienceReviewsByUser />
              </Route>
            )}
            {userRole === "administrador" && (
              <Route
                path="/user/admin/manage-experience-comments/experience"
                exact
              >
                <ManageExperienceReviewsByExperience />
              </Route>
            )}
            {userRole === "administrador" && (
              <Route
                path="/user/admin/manage-experience-comments/user-experience"
                exact
              >
                <ManageExperienceReviewsByUserAndExperience />
              </Route>
            )}
            {userRole === "administrador" && (
              <Route path="/user/admin/business" exact>
                <ManageBusiness />
              </Route>
            )}
            {userRole === "administrador" && (
              <Route path="/user/admin/business/add-business" exact>
                <AddBusiness />
              </Route>
            )}
            {userRole === "administrador" && (
              <Route path="/user/admin/business/manage" exact>
                <HandleBusiness />
              </Route>
            )}

            {userRole === "usuario" && (
              <Route path="/user/:userId" exact>
                <UserPage />
              </Route>
            )}
            {userRole === "usuario" && (
              <Route path="/user/:userId/personal" exact>
                <UserPersonalPage />
              </Route>
            )}
            {userRole === "usuario" && (
              <Route path="/user/:userId/personal/avatar" exact>
                <AddAvatar />
              </Route>
            )}
            {userRole === "usuario" && (
              <Route path="/user/:userId/personal/name" exact>
                <AddName />
              </Route>
            )}
            {userRole === "usuario" && (
              <Route path="/user/:userId/personal/bio" exact>
                <AddBio />
              </Route>
            )}
            {userRole === "usuario" && (
              <Route path="/user/:userId/personal/password" exact>
                <ChangePassword />
              </Route>
            )}
            {userRole === "usuario" && (
              <Route path="/user/:userId/personal/delete" exact>
                <DeleteUser />
              </Route>
            )}
            {userRole === "usuario" && (
              <Route path="/user/:userId/experiences" exact>
                <UserExperiencesPage />
              </Route>
            )}
            {userRole === "usuario" && (
              <Route path="/user/:userId/experiences/past" exact>
                <PastExperiences />
              </Route>
            )}
            {userRole === "usuario" && (
              <Route path="/user/:userId/experiences/enrolled" exact>
                <EnrolledExperiences />
              </Route>
            )}
            {userRole === "usuario" && (
              <Route path="/booking/:idExp" exact>
                <BookingPage />
              </Route>
            )}

            <Route path="/category/:catName/:idCategory" exact>
              <CategoryPage />
            </Route>
            <Redirect to="/" />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
