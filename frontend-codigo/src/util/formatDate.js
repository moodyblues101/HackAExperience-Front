const formatDate = (dateTime) => {
  const date = dateTime.slice(0, 10);
  const time = dateTime.slice(11, 16);

  const newDate = new Date(date);

  const day = newDate.toLocaleString("es-ES", { day: "numeric" });
  const month = newDate.toLocaleString("es-ES", { month: "long" });
  const year = newDate.toLocaleString("es-ES", { year: "numeric" });

  return { day, month, year, time };
};

export default formatDate;
