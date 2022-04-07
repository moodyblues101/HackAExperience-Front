import { Link, useParams } from "react-router-dom";

const AddReview = () => {
  const params = useParams();
  return (
    <div>
      <h2>Añadir Comentario</h2>
      <div>
        <Link to={`/user/${params.userId}/experiences`}>Volver</Link>
      </div>
    </div>
  );
};

export default AddReview;
