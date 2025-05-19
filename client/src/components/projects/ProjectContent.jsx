import AvatarGenerator from "../avatars/AvatarGenerator";
import { useSelector } from "react-redux"
import getDueDate from "../../utils/getDueDate";
import getStatusClassName from "../../utils/getStatusClassName";
import { statuses } from "../../pages/TaskManagement";
import { useState } from "react";
import NewTaskModal from "../tasks/NewTaskModal";
import calculatePriority from "../../utils/calculatePriority";
import getPriorityClassName from "../../utils/getPriorityClassName";






const ProjectContent = ({project}) => {
    const [filters, setFilters] = useState({
      status: "",
      team: ""
  })

  const [sortBy, setSortBy] = useState("oldest")

    const {teams} = useSelector((state) => state.teams)
    const {tasks, loading} = useSelector((state) => state.tasks)

    const projectTasks = tasks.filter(task => task.project._id == project._id)

    const tasksWithPriority = projectTasks.map(task => {
      const modifiedTask = {...task, priority: calculatePriority(task)}

      return modifiedTask
    })

    const priorityOrder = {
  High: 1,
  Medium: 2,
  Low: 3
};

  const filteredTasks = tasksWithPriority.filter(task => {
  const statusMatch = !filters.status || task.status === filters.status;
  const teamMatch = !filters.team || task.team.name === filters.team;
  return statusMatch && teamMatch;
});

    const sortedTasks = sortBy == "newest" ? filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) :
    sortBy == "highPriority" ? filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]) :
    sortBy == "lowPriority" ? filteredTasks.sort((a,b) => priorityOrder[b.priority] - priorityOrder[a.priority]) : 
    filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

    const modalId = `addNewTask-${project._id}`; 


    return (
        <>
            {/* text */}
            <NewTaskModal projectId={project._id} projectName={project.name} modalId={modalId}/>
            
            <div>
                <h3 className="fw-bold mt-1">{project.name}</h3>
                <p className="small text-secondary">{project.description}</p>
            </div>
            {/* sort, filter and new task */}
            <div className="d-flex align-items-center mt-5 mb-3">
                <span className="fw-medium">Sort by:</span>
                <div>
                    <button className={`btn btn-sm ${sortBy === "lowPriority" ? "btn-secondary" : "btn-outline-secondary"} rounded-pill ms-2`} value="lowPriority" onClick={(e) => setSortBy(e.target.value)}>Priority Low-High</button>
                    <button className={`btn btn-sm ${sortBy === "highPriority" ? "btn-secondary" : "btn-outline-secondary"} rounded-pill ms-2`} value="highPriority" onClick={(e) => setSortBy(e.target.value)}>Priority High-Low</button>
                    <button className={`btn btn-sm ${sortBy === "newest" ? "btn-secondary" : "btn-outline-secondary"} rounded-pill ms-2`} value="newest" onClick={(e) => setSortBy(e.target.value)}>Newest First</button>
                    <button className={`btn btn-sm ${sortBy === "oldest" ? "btn-secondary" : "btn-outline-secondary"} rounded-pill ms-2`} value="oldest" onClick={(e) => setSortBy(e.target.value)}>Oldest First</button>
                </div>
                <div className="d-flex gap-3 ms-auto">

                {/* Filter By Status */}
                <div>
        <select className="form-select border-0 bg-body-secondary"  id="statusSelect" onChange={(e) => setFilters({...filters, status: e.target.value})} value={filters.status}>
                    <option value="">Filter By Status</option>
                    {statuses.map((status, index) => <option key={index} value={status}>{status}</option>)}
                  </select>
                </div>

                

                {/* Filter By Team */}
                <div>
        <select className="form-select border-0 bg-body-secondary"  id="teamSelect" onChange={(e) => setFilters({...filters, team: e.target.value})} value={filters.team}>
                    <option value="">Filter By Team</option>
                    {teams.map((team) => <option key={team._id} value={team.name}>{team.name}</option>)}
                  </select>
                </div>
                
                <button className="btn btn-primary btn-sm" data-bs-target={`#${modalId}`} data-bs-toggle="modal">
                <i className="bi bi-plus"></i>
                <span className="fw-medium ms-2">New Task</span>
                </button>
                </div>
            </div>

            {sortedTasks  && sortedTasks.length > 0 && !loading ? <div className="border rounded-top overflow-hidden">
            <table className="table table-hover table-bordered m-0 align-middle">
  <thead className="table-primary border">
    <tr className="">
      <th className="text-secondary  py-3">TASKS</th>
      <th className="text-secondary  py-3">OWNER</th>
      <th className="text-secondary  py-3">PRIORITY</th>
      <th className="text-secondary  py-3">DUE ON</th>
      <th className="text-secondary  py-3">STATUS</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {sortedTasks.map((task) => <tr>
      <td className="fw-medium">{task.name}</td>
      <td>
        <AvatarGenerator people={task.owners} num={3} size={29}/>
      </td>
      <td><div className={`badge ${getPriorityClassName(calculatePriority(task))} rounded-pill fw-medium ms-2`}><i className="bi bi-flag small me-1"></i>{calculatePriority(task)}</div></td>
      <td><span className="ms-2 fw-bold small">{getDueDate(task.createdAt, task.timeToComplete)}</span></td>
      <td><div className={`badge ${getStatusClassName(task.status)} rounded fw-medium ms-2`}>{task.status}</div></td>
      <td>
        <i className="bi bi-arrow-right-short"></i>
      </td>
    </tr>)}
  </tbody>
</table>
</div> : <h4>No Tasks Found</h4>}  
</>
    )
}

export default ProjectContent