import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import toast from "react-hot-toast"
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min"
import { updateTaskAsync } from "../../features/tasks/tasksSlice"

const EditTaskModel = ({task, modalId="editTask"}) => {

  const dispatch = useDispatch()

  const [taskData, setTaskData] = useState({...task, owners: task.owners.map((owner) => owner._id), team: task.team._id, project: task.project._id})

  console.log(taskData)

  const [showTags, setShowTags] = useState(false)
  const [showOwners, setShowOwners] = useState(false)

  const {projects} = useSelector((state) => state.projects)
  const {teams} = useSelector((state) => state.teams)
  const {users} = useSelector((state) => state.users)
  const {tags} = useSelector((state) => state.tags)


  const multiSelectHandler = (e) => {
    const selected = Array.from(e.target.selectedOptions, option => option.value)
    setTaskData({...taskData, [e.target.id]: selected})
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const response = await dispatch(updateTaskAsync(taskData)).unwrap()
      toast.success(response)
      
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
        <h1 className="modal-title fs-5" id="editTaskLabel">Edit Task</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="modal-body">

        {/* select project */}
                  <label htmlFor="projectSelectInput" className="form-label fw-medium">Selected Project</label>
                  <select
                    className="form-select mb-3"
                    id="projectSelectInput"
                    onChange={(e) => setTaskData({...taskData, project: e.target.value})}
                    required
                    value={taskData.project._id}
                  >
                    {projects.map(project => <option key={project._id} value={project._id}>{project.name}</option>)}
                  </select>

                  {/* task name input */}

                  <label htmlFor="taskNameInput" className="form-label fw-medium">Task Name</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter Task Name"
                    id="taskNameInput"
                    value={taskData.name}
                    onChange={(e) => setTaskData({...taskData, name: e.target.value})}
                    required
                  />

                  {/* select team */}

                  <label htmlFor="teamSelectInput" className="form-label fw-medium">Selected Team</label>
                  <select
                    className="form-select mb-3"
                    id="teamSelectInput"
                    onChange={(e) => setTaskData({...taskData, team: e.target.value})}
                    required
                    value={taskData.team}
                  >
                    {teams.map(team => <option key={team._id} value={team._id}>{team.name}</option>)}
                  </select>
                  

                  

                  <div className="row g-3">
                    {/* select owners */}
                  <div className="col-md-6">
                  <label htmlFor="ownersSelectInput" className="form-select fw-medium" onClick={() => setShowOwners(!showOwners)}>Select{taskData.tags.length > 0 && "ed"} Owners {taskData.owners.length > 0 && `(${taskData.owners.length})`}</label>
                  {showOwners && <select id="owners" className="selectpicker form-select" multiple required size="3" title="Choose team members" onChange={multiSelectHandler} value={taskData.owners}>
                    {users.map(user => <option key={user._id} value={user._id}>{user.name}</option>)}
                  </select>}
                  </div>
                  {/* select tags */}
                  <div className="col-md-6">
                  <label htmlFor="tags" className="form-select fw-medium" onClick={() => setShowTags(!showTags)}>Select{taskData.tags.length > 0 && "ed"} Tags {taskData.tags.length > 0 && `(${taskData.tags.length})`}</label>
                    {showTags && <select id="tags" className="selectpicker form-select" multiple required size="3" title="Choose tags" onChange={multiSelectHandler} value={taskData.tags}>
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
                    onChange={(e) => setTaskData({...taskData, status: e.target.value})}
                    required
                    value={taskData.status}
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
                      value={taskData.timeToComplete}
                      onChange={(e) => setTaskData({...taskData, timeToComplete: e.target.value})}
                    />
                  </div>
                </div>
              </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" className="btn btn-primary" >Update</button>
      </div>
      </form>
    </div>
  </div>
</div>
    )
}

export default EditTaskModel