export default function calculatePriority(task) {
  const currentDate = new Date();
  const createdAt = new Date(task.createdAt);
  const timeToComplete = task.timeToComplete;

  const dueDate = new Date(createdAt);
  dueDate.setDate(dueDate.getDate() + timeToComplete);

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysRemaining = (dueDate - currentDate) / msPerDay;

  if (task.tags?.includes("Urgent")) {
    return "High";
  }

  if (daysRemaining <= 1) {
    return "High";
  } else if (daysRemaining <= 3) {
    return "Medium";
  } else {
    return "Low";
  }
}