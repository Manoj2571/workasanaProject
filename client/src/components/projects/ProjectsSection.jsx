
import NewProjectModal from "./NewProjectModal"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { statuses } from "../../pages/TaskManagement";
import getStatusClassName from "../../utils/getStatusClassName";
import getStatus from "../../utils/getStatus";





const ProjectsSection = () => {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState("")
  const {projects, projectsStatus} = useSelector((state) => state.projects)
  const {tasks, tasksStatus} = useSelector((state) => state.tasks)


    

    const projectsWithStatus = projects.map(project => ({...project, status: getStatus(project.name, tasks)}))
    const filteredProjects = statusFilter ? projectsWithStatus.filter(project => project.status == statusFilter) : projectsWithStatus

    return (
        <>
          
         <div className="d-flex flex-wrap align-items-center my-5">
            <h2 className="fw-bold me-4">Projects</h2>
            <select className="form-select bg-light border-0" style={{maxWidth: "fit-content"}} onChange={(e) => setStatusFilter(e.target.value)}>
                <option>Filter By Status</option>
                {statuses.map((status, index) => <option value={status} key={index} >{status}</option>)}
            </select>
            <button type="button" className="ms-auto btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addNewProject" >
            <i className="bi bi-plus"></i>
            <span className="fw-medium ms-2">New Project</span>
            </button>  
         </div>

         <NewProjectModal />

         {/* mapping projects to columns */}
         <div className="row">
            {projectsStatus == "success" && filteredProjects.map((project) => <div className="col-md-4 mb-3" key={project._id}>
            <div className="card p-3 bg-light border-0" onClick={() => navigate(`/project/${(project._id)}/tasks`)}>
                <span className={`badge ${getStatusClassName(getStatus(project.name, tasks))} text-center mt-2 mb-3`} style={{minWidth: "fit-content", width: "28%"}}>
                  {getStatus(project.name, tasks)}
                </span>
                <h5 className="card-title fw-bold">{project.name}</h5>
                <p className="text-muted small fst-normal">
                  {project.description}
                </p>
              </div>
            </div>)}
            {/* <div className="col-md-4 mb-3">
            <div className="card p-3 bg-light border-0">
                <span className="badge bg-warning-subtle text-warning text-center mt-2 mb-3" style={{minWidth: "fit-content", width: "28%"}}>
                  In Progress
                </span>
                <h5 className="card-title fw-bold">Create Moodboard</h5>
                <p className="text-muted small fst-normal">
                  This project centers around compiling a digital moodboard to set the visual
                  direction and tone for a new brand identity. The moodboard will showcase a curated selection of images, color...
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
            <div className="card p-3 bg-light border-0">
                <span className="badge bg-success-subtle text-success text-center mt-2 mb-3" style={{minWidth: "fit-content", width: "28%"}}>
                  Completed
                </span>
                <h5 className="card-title fw-bold">Create Moodboard</h5>
                <p className="text-muted small fst-normal">
                  This project centers around compiling a digital moodboard to set the visual
                  direction and tone for a new brand identity. The moodboard will showcase a curated selection of images, color...
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
            <div className="card p-3 bg-light border-0">
                <span className="badge bg-success-subtle text-success text-center mt-2 mb-3" style={{minWidth: "fit-content", width: "28%"}}>
                  Completed
                </span>
                <h5 className="card-title fw-bold">Create Moodboard</h5>
                <p className="text-muted small fst-normal">
                  This project centers around compiling a digital moodboard to set the visual
                  direction and tone for a new brand identity. The moodboard will showcase a curated selection of images, color...
                </p>
              </div>
            </div> */}
         </div>
        </>
    )
}

export default ProjectsSection