// import { useState } from "react";
import { Link } from "react-router-dom";

//fetch('/api/v1/experiences/${idExp}/reviews')

const ManageExperienceReviews = () => {
  return (
    <div>
      <h2>Gestionar comentarios</h2>
      <div>
        <Link to="/user/admin/">Volver</Link>
      </div>
    </div>
  );
};

export default ManageExperienceReviews;
