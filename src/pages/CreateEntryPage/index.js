import "./style.css";
import CreateEntryForm from "../../components/CreateEntryForm";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import { Redirect } from "react-router";

const CreateEntryPage = () => {
  const [token] = useUserTokenContext();

  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="create_entry_page page">
      <h2 className="create_entry_title">Crea tu entrada</h2>
      <CreateEntryForm />
    </div>
  );
};

export default CreateEntryPage;
