import Experience from "./Experience";

const ExperienceList = (props) => {
  return (
    <>
      <ul>
        {props.experiences.map((experience) => (
          <Experience
            key={experience.id}
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
    </>
  );
};

export default ExperienceList;
