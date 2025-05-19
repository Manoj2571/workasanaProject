import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addNewTaskAsync } from "../../features/tasks/tasksSlice"
import toast from "react-hot-toast"
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min"

const NewTaskModal = ({projectId, modalId="addNewTask"}) => {

  const dispatch = useDispatch()


  const [newTask, setNewTask] = useState({
    name: "",
    project: projectId || "",
    team: "",
    owners: [],
    tags: [],
    timeToComplete: null,
    status: "To Do"
  })

  const [showTags, setShowTags] = useState(false)
  const [showOwners, setShowOwners] = useState(false)

  const {projects} = useSelector((state) => state.projects)
  const {teams} = useSelector((state) => state.teams)
  const {users} = useSelector((state) => state.users)
  const {tags} = useSelector((state) => state.tags)


  const multiSelectHandler = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value)
    setNewTask({...newTask, [e.target.id]: selected})
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const response = await dispatch(addNewTaskAsync(newTask)).unwrap()
      toast.success(response)
      setNewTask({
        name: "",
        project: "",
        team: "",
        owners: [],
        tags: [],
        timeToComplete: null,
        status: "To Do"
      })
      const modalInstance = Modal.getInstance(document.getElementById(modalId))
      modalInstance.hide();

    } catch (error) {
      toast.error(error)
    }
  }


    return (
        <div className="modal fade" id={modalId} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="addNewTaskLabel">Create New Task</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="modal-body">

        {/* select project */}
                  {!projectId && <><label htmlFor="projectSelectInput" className="form-label fw-medium">Select Project</label>
                  <select
                    className="form-select mb-3"
                    id="projectSelectInput"
                    onChange={(e) => setNewTask({...newTask, project: e.target.value})}
                    required
                    value={newTask.project}
                  >
                    <option value="">Dropdown</option>
                    {projects.map(project => <option key={project._id} value={project._id}>{project.name}</option>)}
                  </select></>}

                  {/* task name input */}

                  <label htmlFor="taskNameInput" className="form-label fw-medium">Task Name</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter Task Name"
                    id="taskNameInput"
                    value={newTask.name}
                    onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                    required
                  />

                  {/* select team */}

                  <label htmlFor="teamSelectInput" className="form-label fw-medium">Select Team</label>
                  <select
                    className="form-select mb-3"
                    id="teamSelectInput"
                    onChange={(e) => setNewTask({...newTask, team: e.target.value})}
                    required
                    value={newTask.team}
                  >
                    <option value="">Dropdown</option>
                    {teams.map(team => <option key={team._id} value={team._id}>{team.name}</option>)}
                  </select>
                  

                  

                  <div className="row g-3">
                    {/* select owners */}
                  <div className="col-md-6">
                  <label htmlFor="ownersSelectInput" className="form-select fw-medium" onClick={() => setShowOwners(!showOwners)}>Select{newTask.tags.length > 0 && "ed"} Owners {newTask.owners.length > 0 && `(${newTask.owners.length})`}</label>
                  {showOwners && <select id="owners" className="selectpicker form-select" multiple required size="3" title="Choose team members" onChange={multiSelectHandler} value={newTask.owners}>
                    {users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
                  </select>}
                  </div>
                  {/* select tags */}
                  <div className="col-md-6">
                  <label htmlFor="tags" className="form-select fw-medium" onClick={() => setShowTags(!showTags)}>Select{newTask.tags.length > 0 && "ed"} Tags {newTask.tags.length > 0 && `(${newTask.tags.length})`}</label>
                    {showTags && <select id="tags" className="selectpicker form-select" multiple required size="3" title="Choose tags" onChange={multiSelectHandler} value={newTask.tags}>
                      {tags.map((tag) => <option key={tag._id} value={tag.name}>{tag.name}</option>)}
                    </select>}
                  </div>
                </div>


                <div className="row g-3 mt-1">
                  <div className="col-md-6">
                  <label htmlFor="teamSelectInput" className="form-label fw-medium">Select Status</label>
                  <select
                    className="form-select mb-3"
                    id="teamSelectInput"
                    onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                    required
                    value={newTask.status}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="estimatedTimeInput" className="form-label fw-medium">Estimated Time</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Time in Days"
                      id="estimatedTimeInput"
                      required
                      value={newTask.timeToComplete}
                      onChange={(e) => setNewTask({...newTask, timeToComplete: e.target.value})}
                    />
                  </div>
                </div>
              </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" className="btn btn-primary" >Create</button>
      </div>
      </form>
    </div>
  </div>
</div>
    )
}

export default NewTaskModal