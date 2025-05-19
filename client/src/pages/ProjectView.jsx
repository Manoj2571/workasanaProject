import SideMenuBar from "../components/navigationBar/SideMenuBar"
import ProjectContent from "../components/projects/ProjectContent"
import { useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useSearchParams } from "react-router-dom"
import NewProjectModal from "../components/projects/NewProjectModal"

const ProjectView = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {projects}  = useSelector(state => state.projects) 

    const {data: filteredProjects, loading, error} = useFetch("https://workasana-project-server.vercel.app/projects", searchParams)

    return (
      <>
        <NewProjectModal />
        <div className="d-flex">
            <SideMenuBar />
            <div className="flex-grow-1 px-4 mt-5">
              <div className="d-flex flex-wrap align-items-center my-5">
                <h2 className="fw-bold me-4">Projects</h2>
                <select className="form-select border-0 bg-light"  id="projectSelect" style={{maxWidth: "fit-content"}} onChange={(e) => setSearchParams({...searchParams, name: e.target.value =="" ? []: e.target.value})} value={searchParams.project}>
                    <option value="">Filter By Project</option>
                    {projects.map((project) => <option key={project.name} value={project.name}>{project.name}</option>)}
                </select>
                <button type="button" className="ms-auto btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addNewProject" >
                    <i className="bi bi-plus"></i>
                    <span className="fw-medium ms-2">New Project</span>
                </button>  
            </div>
        <div className="row my-4">
          {loading && <div className="text-center my-5">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>}
          {filteredProjects && !loading && filteredProjects?.map(project => (
            <div className="col-md-12 mb-3" key={project._id}>
                <div className="card p-3 bg-light border-0">
                    <ProjectContent project={project}/>
                </div>
            </div>
          ))}
          {
           filteredProjects?.length == 0 && !loading && <p className="text-start text-danger fw-medium mx-2">No Projects Found</p>
          }
        </div>
      </div>

        </div>
        </>
    )
}


export default ProjectView