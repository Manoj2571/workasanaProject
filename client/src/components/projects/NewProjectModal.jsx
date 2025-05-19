import { useState, useEffect} from "react"
import { useDispatch } from "react-redux"
import { addNewProjectAsync } from "../../features/projects/projectsSlice"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min"

const NewProjectModal = () => {
  const dispatch = useDispatch()

  const [newProject, setNewProject] = useState({
    name: "",
    description: ""
  })


  const handleAddNewProject = async (e) => {
    try {
      e.preventDefault()
      const response = await dispatch(addNewProjectAsync(newProject)).unwrap()
      setNewProject({ name: "", description: "" })
      toast.success(response)
      const modalInstance = Modal.getInstance(document.getElementById('addNewProject'))
      modalInstance.hide();

    } catch (error) {
      toast.error(error)
    }
    
  }


    return (
        <div className="modal fade" id="addNewProject" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addNewProjectLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="addNewProjectLabel">Create New Project</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={handleAddNewProject}>
      <div className="modal-body">
        <label htmlFor="projectNameInput" className="form-label fw-medium">Project Name</label>
        <input className="form-control mb-4" id="projectNameInput" type="text" placeholder="Enter Project Name" value={newProject.name} onChange={(e) => setNewProject({...newProject, name: e.target.value})} required/>
        <label htmlFor="projectDescriptionInput" className="form-label fw-medium">Project Description</label>
        <textarea className="form-control" id="projectDescriptionInput" rows={3} placeholder="Enter Project Description" value={newProject.description} style={{resize: "none"}} onChange={(e) => setNewProject({...newProject, description: e.target.value})} required></textarea>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" className="btn btn-primary">Create</button>
      </div>
      </form>
    </div>
  </div>
</div>
 )
}

export default NewProjectModal