export default function getStatusClassName (status) {
  switch (status) {
    case "To Do": return "bg-info-subtle text-info";
    case "In Progress": return "bg-warning-subtle text-warning";
    case "Completed": return "bg-success-subtle text-success";
    case "Blocked": return "bg-danger-subtle text-danger";
    default: return " ";
  }
}