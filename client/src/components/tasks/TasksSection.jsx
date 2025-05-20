import AvatarGenerator from "../avatars/AvatarGenerator"
import NewTaskModal from "./NewTaskModal"
import { useSelector } from "react-redux"
import getStatusClassName from "../../utils/getStatusClassName"
import { useState } from "react"
import { statuses } from "../../pages/TaskManagement"
import { useNavigate } from "react-router-dom"
import getDueDate from "../../utils/getDueDate"




const TasksSection = () => {

  const navigate = useNavigate()

  const [statusFilter, setStatusFilter] = useState("")

  const {tasks, tasksStatus} = useSelector((state) => state.tasks)
  const {loggedInUser} = useSelector(state => state.users)

  const myTasks = tasks.filter((task) => task.owners.map((owner) => owner._id).includes(loggedInUser._id))

  const filteredTasks = statusFilter ? myTasks.filter(task => task.status == statusFilter) : myTasks

    return (
        <>
         <div className="d-flex flex-wrap align-items-center my-5">
            <h2 className="fw-bold me-4">My Tasks</h2>
            <select className="form-select bg-light border-0" style={{maxWidth: "fit-content"}} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">Filter By Status</option>
                {statuses.map((status, index) => <option key={index} value={status}>{status}</option>)}
            </select>
            <button type="button" className="ms-auto btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addNewTask">
            <i className="bi bi-plus"></i>
            <span className="fw-medium ms-2">New Task</span>
            </button>
         </div>

         <NewTaskModal projectId={null}/>

         {tasksStatus == "loading" && <div className="text-center">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>}

         {/* mapping tasks to columns */}
         <div className="row">
            {tasksStatus == "success" && filteredTasks.map((task) => <div className="col-md-4 mb-3" key={task._id} onClick={() => navigate(`/tasks/${task._id}`)}>
            <div className="card p-3 bg-light border-0">
                <span className={`badge ${getStatusClassName(task.status)} text-center mt-2 mb-3`} style={{minWidth: "fit-content", width: "28%"}}>
                  {task.status}
                </span>
                <h5 className="card-title fw-bold">{task.name}</h5>
                <p className="text-body-tertiary fw-bold">Due on: {getDueDate(task.createdAt, task.timeToComplete)}</p>
                <AvatarGenerator people={task.owners} num={2} size={35}/>
              </div>
            </div>)}
         </div>
        </>
    )

}

export default TasksSection