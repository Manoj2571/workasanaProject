export default function getStatusRadioClassName (status) {
  switch (status) {
    case "To Do": return "btn-outline-info";
    case "In Progress": return "btn-outline-warning";
    case "Completed": return "btn-outline-success";
    case "Blocked": return "btn-outline-danger";
    default: return " ";
  }
}