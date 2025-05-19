const getDueDate = (createdAt, timeToComplete) => {

  const dueDate = new Date(createdAt)
  dueDate.setDate(dueDate.getDate() + timeToComplete)

  const day = dueDate.getDate();
  const month = dueDate.toLocaleString("en-GB", { month: "long" });
  const year = dueDate.getFullYear();

  return `${day} ${month}, ${year}`;
}


export default getDueDate