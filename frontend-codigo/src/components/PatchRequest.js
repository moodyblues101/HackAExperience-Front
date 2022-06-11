import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../ui/FormElements/Input";
import Button from "../ui/FormElements/Button";
import Card from "../ui/Card";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorModal from "../ui/ErrorModal";
import { VALIDATOR_REQUIRE } from "../util/validators";
import { useForm } from "../hooks/form-hook";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../store/auth-context";
import "./PatchRequest.css";

const PatchRequest = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedData, setLoadedData] = useState();
  const history = useHistory();

  let urlUpdate;

  const [formState, inputHandler, setFormData] = useForm(
    {
      [`${props.dataToUpdate}`]: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  if (props.urlRoute === "users") {
    urlUpdate = `http://localhost:3000/api/v1/${props.urlRoute}/${props.dataToUpdate}`;
  } else {
    urlUpdate = "http://localhost:3000/api/v1/experiences";
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let responseData;
        if (props.urlRoute === "users") {
          responseData = await sendRequest(
            "http://localhost:3000/api/v1/users/profile",
            "GET",
            null,
            {
              Authorization: "Bearer " + auth.token,
            }
          );
        } else {
          responseData = await sendRequest(
            `http://localhost:3000/api/v1/experiences/${props.id}`,
            "GET",
            null,
            {
              Authorization: "Bearer " + auth.token,
            }
          );
        }
        setLoadedData(responseData[`${props.dataToUpdate}`]);
        setFormData(
          {
            [`${props.dataToUpdate}`]: {
              value: responseData[`${props.dataToUpdate}`],
              isValid: true,
            },
          },
          true
        );
      } catch (err) { }
    };
    fetchData();
  }, [sendRequest, props, setFormData, auth.token]);

  const updateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (props.urlRoute === "users") {
        await sendRequest(
          urlUpdate,
          "PATCH",
          JSON.stringify({
            [`${props.dataToUpdate}`]:
              formState.inputs[`${props.dataToUpdate}`].value,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        history.replace(`/user/${props.id}/personal`);
      } else {
        await sendRequest(
          `${urlUpdate}/${props.id}`,
          "PATCH",
          JSON.stringify({
            [`${props.dataToUpdate}`]:
              formState.inputs[`${props.dataToUpdate}`].value,
          }),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        history.push("/user/admin/");
      }
    } catch (err) { }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedData && !error) {
    return (
      <div className="center">
        <Card>
          <h2>¡No se ha encontrado!</h2>
        </Card>
        <Button
          to={
            props.urlRoute === "users"
              ? `/user/${props.id}/personal`
              : "/user/admin/"
          }
          exact="exact"
        >
          VOLVER
        </Button>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedData && (
        <form className="place-form" onSubmit={updateSubmitHandler}>
          <Input
            id={`${props.dataToUpdate}`}
            element={
              props.dataToUpdate === "bio" ||
                props.dataToUpdate === "description"
                ? "textarea"
                : "input"
            }
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor, introduzca un dato válido"
            onInput={inputHandler}
            initialValue={loadedData}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            MODIFICAR
          </Button>
          <Button
            to={
              props.urlRoute === "users"
                ? `/user/${props.id}/personal`
                : "/user/admin/"
            }
            exact="exact"
          >
            CANCELAR
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default PatchRequest;
