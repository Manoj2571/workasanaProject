const getPriorityClassName = (priority) => {
  switch (priority) {
    case "High": return "bg-danger-subtle text-danger";
    case "Low": return "bg-light text-body-tertiary";
    case "Medium": return "text-indigo bg-indigo";
    default: return " ";
  }
}

export default getPriorityClassName