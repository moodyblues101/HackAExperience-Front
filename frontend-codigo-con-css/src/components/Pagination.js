import { useState } from "react";

import "./Pagination.css";

//dataLimit: numero de experiencias por pagina
//pageLimit: nuero de paginas a mostrar en la paginacion

function Pagination({ data, RenderComponent, title, pageLimit, dataLimit }) {
  const [pages] = useState(Math.ceil(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let newPageLimit;
    if (pageLimit < pages) {
      newPageLimit = pageLimit;
    } else {
      newPageLimit = pages;
    }

    let start = Math.floor((currentPage - 1) / newPageLimit) * newPageLimit;
    const newAr = new Array(newPageLimit)
      .fill()
      .map((num, idx) => start + idx + 1);
    return newAr;
  };

  return (
    <div>
      <h1>{title}</h1>

      {/* show the posts, 10 posts at a time */}
      <div className="dataContainer">
        {getPaginatedData().map((experience) => (
          <RenderComponent
            key={experience.id}
            id={experience.id}
            image={experience.imgExp}
            name={experience.name}
            city={experience.city}
            price={experience.price}
            date={experience.dates[0].eventStartDate}
            rating={experience.rating}
          />
        ))}
      </div>

      {/* show the pagiantion
          it consists of next and previous buttons
          along with page numbers, in our case, 5 page
          numbers at a time
      */}
      <div className="pagination">
        {/* previous button */}
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>

        {/* show page numbers */}
        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        {/* next button */}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
