import { useEffect, useState, useRef, useCallback } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import Button from "../ui/FormElements/Button";
import formatDate from "../util/formatDate";
import ReactStars from "react-rating-stars-component";

import Pagination from "./Pagination";

import "./AllExperiences.css";

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
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getAllExperiences = useCallback(async () => {
    try {
      const res = await sendRequest("http://localhost:3000/api/v1/experiences");

      const expWithDates = [];

      for (const exp of res) {
        const dates = await sendRequest(
          `http://localhost:3000/api/v1/experiences/${exp.id}/dates`
        );
        const imgExp = await sendRequest(
          `http://localhost:3000/api/v1/experiences/${exp.id}/images`
        );

        expWithDates.push({ ...exp, dates, imgExp: imgExp[0] });
      }

      const now = new Date();

      const nextExp = [];
      for (const exp of expWithDates) {
        const isAfterDate = (e) => e > now;
        if (exp.dates.findIndex(isAfterDate) !== null) {
          nextExp.push(exp);
        }
      }

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

    let filtExp2;
    if (category.length !== 0) {
      filtExp2 = filteredExperiences.filter((exp) => {
        return exp.idCategory === +category;
      });
    } else {
      filtExp2 = filteredExperiences.map((exp) => {
        return { ...exp };
      });
    }

    let finalFilterExp;

    if (date.length !== 0) {
      const almostFinalFilterExp = filtExp2.map((exp) => {
        const formatDates = exp.dates.map((date) => {
          const dateExp = new Date(date.eventStartDate);
          const yearExp = dateExp.getFullYear();
          const monthExp = ("0" + (dateExp.getMonth() + 1)).slice(-2);
          const dayExp = ("0" + dateExp.getDate()).slice(-2);
          const dateExpTrans = `${yearExp}-${monthExp}-${dayExp}`;
          return dateExpTrans;
        });
        return { ...exp, dates: formatDates };
      });

      finalFilterExp = almostFinalFilterExp.filter((exp) =>
        exp.dates.includes(date)
      );
    } else {
      finalFilterExp = filtExp2.map((exp) => {
        return { ...exp };
      });
    }

    if (finalFilterExp.length === 0) {
      setShowList(false);
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
        <div className="search-container">
          <h2 className="search-title">Búsqueda</h2>
          <form className="search-form" onSubmit={submitSearchHandler}>
            <div className="input-data">
              <label htmlFor="city">Elige un lugar:</label>
              <input id="city" type="text" ref={cityRef} />
            </div>
            <div className="input-data">
              <label htmlFor="date">Selecciona una fecha:</label>
              <input id="date" type="date" ref={dateRef} />
            </div>
            <div className="input-data">
              <label htmlFor="category">Elige una categoría:</label>
              <select id="category" type="text" ref={categoryRef}>
                <option></option>
                <option value="1">Bienestar</option>
                <option value="2">Gastronomía</option>
                <option value="3">Conducción</option>
                <option value="4">Aventura</option>
              </select>
            </div>
            <div>
              <Button type="submit">BUSCAR</Button>
            </div>
          </form>
        </div>
      )}

      {showList && (
        <div className="btn-new-search">
          <Button type="button" onClick={cleanSearchHandler}>
            NUEVA BÚSQUEDA
          </Button>
        </div>
      )}

      {isLoading && <LoadingSpinner />}

      {showList && (
        <div>
          {sortedExperiences.length !== 0 && (
            <div className="search-btn-sort">
              <Button type="button" onClick={changeSortHandler}>
                {isSortAscending
                  ? "Precio de mayor a menor"
                  : "Precio de menor a mayor"}
              </Button>
            </div>
          )}
          {sortedExperiences.length > 0 ? (
            <Pagination
              data={sortedExperiences}
              RenderComponent={Experience}
              title="Experiencias encontradas"
              pageLimit={4}
              dataLimit={5}
            />
          ) : (
            <h3>No hay experiencias para mostrar</h3>
          )}
        </div>
      )}
    </>
  );
};

export default AllExperiences;

const Experience = (props) => {
  const startDate =
    formatDate(props.date).day +
    "/" +
    formatDate(props.date).month +
    "/" +
    formatDate(props.date).year;

  return (
    <li className="search-li-container">
      <Link to={`/experiences/${props.id}`}>
        <div className="search-div-separation">
          <div>{props.name}</div>
        </div>
        <div className="search-li-data">
          <div className="search-img-container">
            <img
              src={`http://localhost:3000/experiences/${props.id}/${props.image.name}`}
              alt="experience"
            />
          </div>
          <div className="search-li-data-exp">
            <div>{props.city}</div>
            <div>{startDate}</div>
            <div>{props.price}€</div>
            <div>
              {props.rating !== null && (
                <ReactStars
                  value={props.rating}
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  edit={false}
                />
              )}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
