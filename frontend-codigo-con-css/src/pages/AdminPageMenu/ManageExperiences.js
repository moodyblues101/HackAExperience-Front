import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { useHttpClient } from "../../hooks/http-hook";
import LoadingSpinner from "../../ui/LoadingSpinner";
import ErrorModal from "../../ui/ErrorModal";
import Button from "../../ui/FormElements/Button";

import "./ManageExperiences.css";

const ManageExperiences = () => {
  const history = useHistory();
  const [experiencesList, setExperiencesList] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchExperiences = useCallback(async () => {
    const resExp = await sendRequest(
      "http://localhost:3000/api/v1/experiences"
    );
    setExperiencesList(resExp);
  }, [sendRequest]);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const reuseHandler = (id) => {
    history.push(`/user/admin/experiences/reuse-experience/${id}`);
  };

  const manageReviewsHandler = (id) => {
    history.push(`/user/admin/experiences/manage-experience-comments/${id}`);
  };

  const updateExperienceHandler = (id) => {
    history.push(`/user/admin/experiences/modify-experience/${id}`);
  };

  const deleteExperienceHandler = (id) => {
    history.push(`/user/admin/experiences/delete-experience/${id}`);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div className="manage-exp-btn-new">
        <Button to="/user/admin/">VOLVER</Button>
        <Button to="/user/admin/experiences/new-experience">
          NUEVA EXPERIENCIA
        </Button>
      </div>
      <div className="manage-exp-container">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Lugar</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {experiencesList.map((exp) => {
              return (
                <tr key={exp.id}>
                  <td>{exp.id}</td>
                  <td>{exp.name}</td>
                  <td>{exp.city}</td>
                  <td>
                    <div className="manage-exp-actions-container">
                      <div className="manage-exp-btn-container">
                        <input
                          className="manage-exp-btn"
                          key={exp.id}
                          type="button"
                          value={"REUTILIZAR"}
                          onClick={() => {
                            reuseHandler(exp.id);
                          }}
                        />
                      </div>
                      <div>
                        <input
                          className="manage-exp-btn"
                          key={exp.id}
                          type="button"
                          value={"GESTIONAR COMENTARIOS"}
                          onClick={() => {
                            manageReviewsHandler(exp.id);
                          }}
                        />
                      </div>
                      <div>
                        <input
                          className="manage-exp-btn"
                          key={exp.id}
                          type="button"
                          value={"ACTUALIZAR DATOS"}
                          onClick={() => {
                            updateExperienceHandler(exp.id);
                          }}
                        />
                      </div>
                      <div>
                        <input
                          className="manage-exp-btn"
                          key={exp.id}
                          type="button"
                          value={"ELIMINAR"}
                          onClick={() => {
                            deleteExperienceHandler(exp.id);
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageExperiences;
