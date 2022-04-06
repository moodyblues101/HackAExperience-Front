import Experience from "./Experience";

const ExperienceList = (props) => {
  return (
    <ul>
      {props.experiences.map((experience) => (
        <Experience
          key={experience.id}
          name={experience.name}
          description={experience.description}
        />
      ))}
    </ul>
  );
};

export default ExperienceList;
