import AllExperiences from "../components/AllExperiences";

import "./SearchPage.css";

const SearchPage = () => {
  return (
    <>
      <h2>search Page</h2>

      <div className="container-search">
        {/* <aside className="aside-search">
          <div>
            <div>Buscar por:</div>
            <ul>
              <li>Fecha de la actividad</li>
              <li>Precio</li>
              <li>Ciudad</li>
              <li>Categoria</li>
            </ul>
          </div>
        </aside> */}
        <div>
          {/* <div className="order-search">ordenar</div> */}
          <article className="article-search">
            {/* <div>resultado de la busqueda</div> */}
            <AllExperiences />
          </article>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
