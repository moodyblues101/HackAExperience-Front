import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import EntriesPage from "./pages/EntriesPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { UserTokenContextProvider } from "./contexts/UserTokenContext";
import EntryPage from "./pages/EntryPage";
import CreateEntryPage from "./pages/CreateEntryPage";
import ProfilePage from "./pages/ProfilePage";
import EditPasswordPage from "./pages/EditPasswordPage";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Router>
      <UserTokenContextProvider>
        <Header />
        <Switch>
          <Route exact path="/">
            <EntriesPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/entry/:id">
            <EntryPage />
          </Route>
          <Route path="/create/entry">
            <CreateEntryPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/editPassword">
            <EditPasswordPage />
          </Route>
        </Switch>
      </UserTokenContextProvider>
      <ToastContainer position="bottom-center" autoClose={4000} limit={3} />
    </Router>
  );
};

export default App;
