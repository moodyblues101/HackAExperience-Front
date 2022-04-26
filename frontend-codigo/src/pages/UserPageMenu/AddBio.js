import { useParams } from "react-router-dom";
import PatchRequest from "../../components/PatchRequest";

const AddBio = () => {
  const userId = useParams().userId;

  return <PatchRequest urlRoute="users" dataToUpdate="bio" id={userId} />;
};

export default AddBio;
