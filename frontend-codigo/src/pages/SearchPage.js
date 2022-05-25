import AllExperiences from "../components/AllExperiences";

import "./SearchPage.css";

const SearchPage = () => {
  return (
    <>
      <h2>search Page</h2>

      <div className="container-search">
        <div>
          <article className="article-search">
            <AllExperiences />
          </article>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
