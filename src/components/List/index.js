import "./style.css";

const List = ({ className, data, render }) => {
  return <div className={className}>{data.map(render)}</div>;
};

export default List;
