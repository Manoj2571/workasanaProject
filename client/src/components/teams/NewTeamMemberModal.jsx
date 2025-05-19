
import Select from "react-select"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import toast from "react-hot-toast"
import { addNewTeamMemberAsync } from "../../features/teams/teamsSlice"
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min"


const NewTeamMemberModal = ({team}) => {
  const dispatch = useDispatch()
  const [member, setMember] = useState({})

  const {users} = useSelector((state) => state.users)

  const availableUsers = users.filter((user) => !team.members.map(member => member._id).includes(user._id))

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const response = await dispatch(addNewTeamMemberAsync({teamId: team._id, member: member._id})).unwrap()
      console.log(response)
      toast.success(response)
      setMember({})
      const modalInstance = Modal.getInstance(document.getElementById('addNewMember'))
      modalInstance.hide();
    } catch (error) {
       toast.error(error)
    }
  }

    return (
        <div class="modal fade" id="addNewMember" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addNewMemberLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" style={{alignItems: "self-end"}}>
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="addNewMemberLabel">Add New Member</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={handleSubmit}>
      <div class="modal-body">
        <label htmlFor="addMembersInput" className="form-label fw-medium">Members Name</label>
        <Select
            options={availableUsers}
            value={member}
            onChange={(user) => setMember(user)}
            getOptionLabel={(user) => user.name}
            getOptionValue={(user) => user._id}
            placeholder="Member Name"
            isClearable
          />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-primary">Add</button>
      </div>
      </form>
    </div>
  </div>
</div>
    )
}

export default NewTeamMemberModal