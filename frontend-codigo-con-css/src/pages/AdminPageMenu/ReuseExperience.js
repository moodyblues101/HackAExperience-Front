import { useParams } from "react-router-dom";

import ReactivateExperience from "../../components/ReactivateExperience";

const ReuseExperience = () => {
  const idExp = useParams().idExp;
  return <ReactivateExperience idExp={idExp} />;
};

export default ReuseExperience;
