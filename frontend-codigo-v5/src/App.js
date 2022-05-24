import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

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

import AuthContext from "./store/auth-context";
import Layout from "./ui/Layout";
import AcercadePage from "./pages/AcercadePage";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
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
        {!authCtx.isLoggedIn && (
          <Route path="/login">
            <LoginPage />
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/register">
            <RegisterPage />
          </Route>
        )}

        <Route path="/user/admin/" exact>
          {authCtx.isLoggedIn && <AdminPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/user/admin/new-experience" exact>
          {authCtx.isLoggedIn && <CreateNewExperience />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/user/admin/modify-experience" exact>
          {authCtx.isLoggedIn && <ModifyExperience />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/user/admin/delete-experience" exact>
          {authCtx.isLoggedIn && <DeleteExperience />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/user/admin/manage-experience-comments" exact>
          {authCtx.isLoggedIn && <ManageExperienceReviews />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/user/:userId" exact>
          {authCtx.isLoggedIn && <UserPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/user/:userId/personal" exact>
          {authCtx.isLoggedIn && <UserPersonalPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/user/:userId/personal/avatar" exact>
          {authCtx.isLoggedIn && <AddAvatar />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/user/:userId/personal/name" exact>
          {authCtx.isLoggedIn && <AddName />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/user/:userId/personal/bio" exact>
          {authCtx.isLoggedIn && <AddBio />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/user/:userId/personal/password" exact>
          {authCtx.isLoggedIn && <ChangePassword />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/user/:userId/experiences" exact>
          {authCtx.isLoggedIn && <UserExperiencesPage />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/user/:userId/experiences/past" exact>
          {authCtx.isLoggedIn && <PastExperiences />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/user/:userId/experiences/enrolled" exact>
          {authCtx.isLoggedIn && <EnrolledExperiences />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/user/:userId/experiences/review" exact>
          {authCtx.isLoggedIn && <AddReview />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/acercade">
          <AcercadePage />
        </Route>

        <Route path="/:idCategory">
          <CategoryPage />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
