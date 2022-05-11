import { useEffect, useState, useRef, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import Card from "../ui/Card";
import Button from "../ui/FormElements/Button";
import Modal from "../ui/Modal";
import { Link } from "react-router-dom";

const sortExperiences = (experiences, ascending) => {
  return experiences.sort((expA, expB) => {
    if (ascending) {
      return expA.price > expB.price ? 1 : -1;
    } else {
      return expA.price < expB.price ? 1 : -1;
    }
  });
};

const AllExperiences = () => {
  const history = useHistory();
  const location = useLocation();

  const [loadedExperiences, setLoadedExperiences] = useState([]);
  const [nextExperiences, setNextExperiences] = useState([]);
  const dateRef = useRef();
  const cityRef = useRef();
  const categoryRef = useRef();
  const [showList, setShowList] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getAllExperiences = useCallback(async () => {
    try {
      const res = await sendRequest("http://localhost:3000/api/v1/experiences");

      const now = new Date();

      const nextExp = res.experiencesData.filter(
        (exp) => new Date(exp.eventStartDate) > now
      );

      // console.log(nextExperiences);

      setNextExperiences(nextExp);
    } catch (err) {}
  }, [sendRequest]);

  useEffect(() => {
    getAllExperiences();
  }, [getAllExperiences]);

  const submitSearchHandler = (event) => {
    event.preventDefault();
    setShowList(false);

    const city = cityRef.current.value;
    const category = categoryRef.current.value;
    const date = dateRef.current.value;

    // console.log("ciudad: ", city);
    // console.log("categoria: ", category);
    // console.log("fecha: ", date);

    let filteredExperiences;
    if (city.length !== 0) {
      filteredExperiences = nextExperiences.filter(
        (exp) => exp.city.toLowerCase().trim() === city.toLowerCase().trim()
      );
    } else {
      filteredExperiences = nextExperiences.map((exp) => {
        return { ...exp };
      });
    }

    // console.log("filteredExp1: ", filteredExperiences);
    // console.log("filteredExp1 long: ", filteredExperiences.length);

    let filtExp2;
    if (category.length !== 0) {
      filtExp2 = filteredExperiences.filter((exp) => {
        console.log("id categoria exp: ", exp.idCategory);
        return exp.idCategory === +category;
      });
    } else {
      filtExp2 = filteredExperiences.map((exp) => {
        return { ...exp };
      });
    }

    // console.log("filteredExp2: ", filtExp2);
    // console.log("filteredExp2 long: ", filtExp2.length);

    // console.log("fecha introducida: ", date);

    let finalFilterExp;
    if (date.length !== 0) {
      finalFilterExp = filtExp2.filter((exp) => {
        const dateExp = new Date(exp.eventStartDate);
        const yearExp = dateExp.getFullYear();
        const monthExp = ("0" + (dateExp.getMonth() + 1)).slice(-2);
        const dayExp = ("0" + dateExp.getDate()).slice(-2);
        const dateExpTrans = `${yearExp}-${monthExp}-${dayExp}`;
        // console.log("fecha conver: ", dateExp);
        return dateExpTrans === date;
      });
    } else {
      finalFilterExp = filtExp2.map((exp) => {
        return { ...exp };
      });
    }

    // console.log("filteredExp3: ", finalFilterExp);

    if (finalFilterExp.length === 0) {
      setShowList(false);
      setShowModal(true);
    }

    setLoadedExperiences(finalFilterExp);

    cityRef.current.value = "";
    categoryRef.current.value = "";
    dateRef.current.value = "";

    setShowList(true);

    history.push({
      pathname: location.pathname,
      search: `?city=${city}&date=${date}&category=${category}&sort="asc"`,
    });
  };

  const cleanSearchHandler = () => {
    setShowList(false);
    history.push("/search");
  };

  const queryParams = new URLSearchParams(location.search);

  const citySearch = queryParams.get("city");
  const dateSearch = queryParams.get("date");
  const categorySearch = queryParams.get("category");
  const isSortAscending = queryParams.get("sort") === "asc";

  const sortedExperiences = sortExperiences(loadedExperiences, isSortAscending);

  const changeSortHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?city=${citySearch}&date=${dateSearch}&category=${categorySearch}&sort=${
        isSortAscending ? "desc" : "asc"
      }`,
    });
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!showList && (
        <Card>
          <form onSubmit={submitSearchHandler}>
            <div>
              <label htmlFor="city">Elige un lugar:</label>
              <input id="city" type="text" ref={cityRef} />
            </div>
            <div>
              <label htmlFor="date">Selecciona una fecha:</label>
              <input id="date" type="date" ref={dateRef} />
            </div>
            <div>
              <label htmlFor="category">Elige una categoría:</label>
              <select id="category" type="text" ref={categoryRef}>
                <option></option>
                <option value="1">Bienestar</option>
                <option value="2">Gastronomía</option>
                <option value="3">Conducción</option>
                <option value="4">Aventura</option>
                <option value="5">Sorpresa</option>
              </select>
            </div>
            <div>
              <Button type="submit">BUSCAR</Button>
            </div>
          </form>
        </Card>
      )}
      <Modal show={showModal} footer={<Button to="/">VOLVER</Button>}>
        <p>No existen experiencias para mostrar</p>
      </Modal>
      {showList && (
        <div>
          <Button type="button" onClick={cleanSearchHandler}>
            NUEVA BÚSQUEDA
          </Button>
        </div>
      )}
      {isLoading && <LoadingSpinner />}
      {showList && (
        <div>
          <div>
            <Button type="button" onClick={changeSortHandler}>
              {isSortAscending ? "De mayor a menor" : "De menor a mayor"}
            </Button>
          </div>
          <ul>
            {sortedExperiences.map((experience) => (
              <Experience
                key={experience.id}
                id={experience.id}
                name={experience.name}
                description={experience.description}
                city={experience.city}
                price={experience.price}
                eventStartDate={experience.eventStartDate}
                eventEndDate={experience.eventEndDate}
                idBusiness={experience.idBusiness}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default AllExperiences;

const Experience = (props) => {
  return (
    <li>
      <h2>
        <Link to={`/experiences/${props.id}`}>{props.name}</Link>
      </h2>
      <h3>{props.description}</h3>
      <h3>{props.description}</h3>
      <h3>{props.city}</h3>
      <h3>{props.price}</h3>
      <h3>{props.eventStartDate}</h3>
      <h3>{props.eventEndDate}</h3>
      <h3>{props.idBusiness}</h3>
    </li>
  );
};
