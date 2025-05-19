
import SideMenuBar from "../components/navigationBar/SideMenuBar"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import ProjectContent from "../components/projects/ProjectContent"




const ProjectDetail = () => {

  const {projectId} = useParams()

  const {projects} = useSelector((state) => state.projects)

  const currentProject = projects?.find((project) => project._id === projectId)

    return (
        <div className="d-flex">
            <SideMenuBar />
           <div className="flex-grow-1 px-4 mt-5">
            <ProjectContent project={currentProject}/>
           </div>  
        </div> 
    )
}

export default ProjectDetail