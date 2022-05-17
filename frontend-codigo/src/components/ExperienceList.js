import Experience from "./Experience";

const ExperienceList = (props) => {
  return (
    <>
      <ul>
        {props.experiences.map((experience) => (
          <Experience
            key={experience.id}
            id={experience.id}
            name={experience.name}
            description={experience.description}
            city={experience.city}
            price={experience.price}
            eventStartDate={experience.eventStartDate}
            eventEndDate={experience.eventEndDate}
            // idBusiness={experience.idBusiness}
            businessName={experience.businessName}
            categoryName={experience.categoryName}
            imgExp={experience.imgExp}
            rating={experience.rating}
          />
        ))}
      </ul>
    </>
  );
};

export default ExperienceList;
