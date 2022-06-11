import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";
import ExperienceList from "../components/ExperienceList";
import ReviewList from "../components/ReviewList";
import ErrorModal from "../ui/ErrorModal";
import LoadingSpinner from "../ui/LoadingSpinner";
import Button from "../ui/FormElements/Button";

import bienestarImage from "../assets/categories/bienestar.jpg";
import aventuraImage from "../assets/categories/adventure.jpg";
import gastronomiaImage from "../assets/categories/gastronomia.jpg";
import velocidadImage from "../assets/categories/velocidad.jpg";

import "./CategoryPage.css";

const CategoryPage = () => {
  const idCat = useParams().idCategory;
  const nameCat = useParams().catName;
  const [experiences, setExperiences] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let catImage;
  let altDesc;
  switch (idCat) {
    case "1":
      catImage = bienestarImage;
      altDesc = "hand over water";
      break;
    case "2":
      catImage = gastronomiaImage;
      altDesc = "some fruits and vegetables";
      break;
    case "3":
      catImage = velocidadImage;
      altDesc = "speedometer";
      break;
    case "4":
      catImage = aventuraImage;
      altDesc = "four people in a hiking route";
      break;

    default:
      break;
  }

  const fetchExpAndRevByCategory = useCallback(async () => {
    try {
      const resExp = await sendRequest(
        `http://localhost:3000/api/v1/categories/${idCat}/experiences`
      );

      const now = new Date();
      const arrayNextExperiences = [];

      for (let i = 0; i < resExp.length; i++) {
        const dateExp = await sendRequest(
          `http://localhost:3000/api/v1/experiences/${resExp[i].id}/dates`
        );

        const nextDates = dateExp.filter(
          (date) => new Date(date.eventStartDate) > now
        );

        if (nextDates.length !== 0) {
          arrayNextExperiences.push({ ...resExp[i], dates: nextDates });
        }
      }

      const arrayShowExp = [];

      for (let i = 0; i < arrayNextExperiences.length && i < 4; i++) {
        arrayShowExp.push(arrayNextExperiences[i]);
      }

      const imgAdded = [];

      for (let i = 0; i < arrayShowExp.length; i++) {
        const id = arrayShowExp[i].id;
        const resImgExp = await sendRequest(
          `http://localhost:3000/api/v1/experiences/${id}/images`
        );

        imgAdded.push({
          ...arrayShowExp[i],
          imgExp: resImgExp[0].name,
        });
      }

      setExperiences(imgAdded);

      const resRev = await sendRequest(
        `http://localhost:3000/api/v1/reviews/category/${idCat}`
      );

      const orderRev = resRev
        .sort(function (revA, revB) {
          return revA.rating - revB.rating;
        })
        .reverse();

      const arrayBestRev = [];

      for (let i = 0; i < orderRev.length && i < 4; i++) {
        arrayBestRev.push(orderRev[i]);
      }

      setReviews(arrayBestRev);
    } catch (err) {}
  }, [idCat, sendRequest]);

  useEffect(() => {
    fetchExpAndRevByCategory();
  }, [fetchExpAndRevByCategory]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}

      <div className="cat-main-img">
        <img src={catImage} alt={altDesc} />
      </div>
      <div className="description-category">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut
          tellus erat. Phasellus eu metus nibh. Nullam efficitur, lacus at
          venenatis tristique, urna purus tempus massa, a vestibulum turpis
          tellus in justo. Duis tincidunt metus a ipsum euismod placerat. In
          consequat aliquet augue ac euismod. Proin semper libero eget lacinia
          tristique. Integer sed sem a justo commodo egestas. Phasellus et
          congue eros, at mattis nunc. Donec tempor tortor non massa rutrum
          condimentum. Vivamus et rhoncus mauris. Aenean tellus lacus, lobortis
          ut ante non, sodales auctor tellus. Ut ut libero lectus. Curabitur ut
          mattis lacus. Suspendisse at sodales libero.
        </p>
      </div>
      <p className="next-exp">Próximas experiencias en {nameCat}:</p>
      <div>
        <ExperienceList experiences={experiences} />
      </div>
      <p className="next-exp">Opiniones de nuestros clientes:</p>
      <div>
        <ReviewList reviews={reviews} />
      </div>
      <Button to="/search">BUSCAR MÁS</Button>
    </>
  );
};

export default CategoryPage;
