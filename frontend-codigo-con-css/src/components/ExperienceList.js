import Experience from "./Experience";

import "./ExperienceList.css";

const ExperienceList = (props) => {
  return (
    <>
      <div className="experience-list-container">
        <ul>
          {props.experiences.map((experience) => (
            <Experience
              key={experience.id}
              id={experience.id}
              name={experience.name}
              description={experience.description}
              city={experience.city}
              price={experience.price}
              eventStartDate={experience.dates[0].eventStartDate}
              imgExp={experience.imgExp}
              rating={experience.rating}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ExperienceList;
