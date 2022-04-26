import { useParams } from "react-router-dom";

import PatchRequest from "../../components/PatchRequest";

import "./AddName.css";

const AddName = () => {
  const userId = useParams().userId;

  return <PatchRequest urlRoute="users" dataToUpdate="name" id={userId} />;
};

export default AddName;
