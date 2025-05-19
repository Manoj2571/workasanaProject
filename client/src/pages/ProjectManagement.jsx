
import SideMenuBar from "../components/navigationBar/SideMenuBar"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import ProjectContent from "../components/projects/ProjectContent"




const ProjectManagement = () => {

  const {projectId} = useParams()

  const {projects} = useSelector((state) => state.projects)

  const currentProject = projects?.find((project) => project._id === projectId)

    return (
        <div className="d-flex">
            <SideMenuBar />
           <div className="flex-grow-1 px-4 mt-5">
            <ProjectContent project={currentProject}/>
            {/* text */}
            {/* <div>
                <h2 className="fw-bold mt-1">{currentProject.name}</h2>
                <p className="small text-secondary">{currentProject.description}</p>
            </div> */}
            {/* sort, filter and new task */}
            {/* <div className="d-flex align-items-center mt-5 mb-3">
                <span className="fw-medium">Sort by:</span>
                <div>
                    <button className="btn  btn-sm btn-outline-secondary rounded-pill ms-2">Priority Low-High</button>
                    <button className="btn btn-sm btn-outline-secondary rounded-pill ms-2">Priority High-Low</button>
                    <button className="btn btn-sm btn-outline-secondary rounded-pill ms-2">Newest First</button>
                    <button className="btn btn-sm btn-outline-secondary rounded-pill ms-2">Oldest First</button>
                </div>
                <div className="ms-auto d-flex gap-4">
                <select className="form-select bg-light border-0" style={{width: "fit-content"}}>
                    <option>Filter</option>
                </select>
                <button className="btn btn-primary btn-sm" data-bs-target="#addNewTask" data-bs-toggle="modal">
                <i class="bi bi-plus"></i>
                <span className="fw-medium ms-2">New Task</span>
                </button>
                </div>
            </div> */}

            {/* <NewTaskModal projectId={projectId}/> */}

            {/* {filteredTasks.length > 0 ? <div className="border rounded-top overflow-hidden">
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
    {filteredTasks.map((task) => <tr>
      <td className="fw-medium">{task.name}</td>
      <td>
        <AvatarGenerator people={task.owners} num={3} size={29}/>
      </td>
      <td><div className={`badge ${getPriorityClassName(calculatePriority(task))} rounded-pill fw-medium ms-2`}><i class="bi bi-flag small me-1"></i>{calculatePriority(task)}</div></td>
      <td><span className="ms-2 fw-bold small">{getDueDate(task.createdAt, task.timeToComplete)}</span></td>
      <td><div className={`badge ${getStatusClassName(task.status)} rounded fw-medium ms-2`}>{task.status}</div></td>
      <td>
        <i class="bi bi-arrow-right-short"></i>
      </td>
    </tr>)}
  </tbody>
</table>
</div> : <h2>No Tasks Found</h2>} */}

            {/* table */}

            {/* <div class="border rounded-top overflow-hidden">
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
    <tr>
      <td className="fw-medium">Create File Feature</td>
      <td>
        <AvatarGenerator people={arr} num={3} size={29}/>
      </td>
      <td><div className="badge bg-danger-subtle text-danger rounded-pill fw-medium ms-2"><i class="bi bi-flag small me-1"></i>High</div></td>
      <td><span className="ms-2 fw-bold small">20 Dec, 2024</span></td>
      <td><div className="badge bg-success-subtle text-success rounded fw-medium ms-2">Completed</div></td>
      <td>
        <i class="bi bi-arrow-right-short"></i>
      </td>
    </tr>
    <tr>
    <td className="fw-medium">Create File Feature</td>
    <td><AvatarGenerator people={[{id: 2, name: "Manoj"}]} num={3} size={29}/></td>
    <td><div className="badge bg-light text-body-tertiary rounded-pill fw-medium ms-2"><i class="bi bi-flag small me-1"></i>Low</div></td>
    <td><span className="ms-2 fw-bold small">20 Dec, 2024</span></td>
    <td><div className="badge bg-warning-subtle text-warning rounded fw-medium ms-2">In Progress</div></td>
      <td>
        <i class="bi bi-arrow-right-short"></i>
      </td>
    </tr>
    <tr>
    <td className="fw-medium">Create File Feature</td>
    <td><AvatarGenerator people={arr} num={2} size={29}/></td>
    <td><div className="badge rounded-pill text-indigo bg-indigo fw-medium ms-2" ><i class="bi bi-flag small me-1"></i>Medium</div></td>
    <td><span className="ms-2 fw-bold small">20 Dec, 2024</span></td>
    <td><div className="badge bg-warning-subtle text-warning rounded fw-medium ms-2">In Progress</div></td>
      <td>
        <i class="bi bi-arrow-right-short"></i>
      </td>
    </tr>
  </tbody>
</table>
</div> */}
</div>
              
            </div> 
    )
}

export default ProjectManagement