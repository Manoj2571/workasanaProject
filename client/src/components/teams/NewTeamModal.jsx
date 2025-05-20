import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { fetchUsers } from "../../features/users/usersSlice";
import { addNewTeamAsync } from "../../features/teams/teamsSlice";
import toast from 'react-hot-toast';

const NewTeamModal = () => {
  const dispatch = useDispatch();
    const { users } = useSelector((state) => state.users);
  
    const [teamName, setTeamName] = useState('');
    const [memberInputs, setMemberInputs] = useState([null, null, null]); // array of selected user objects
  
    useEffect(() => {
      dispatch(fetchUsers());
    }, []);
  

  const availableUsers = users.filter(user => !memberInputs.filter(Boolean).map((member) => member._id).includes(user._id))
  
    const handleSelect = (index, selectedUser) => {
      const updated = [...memberInputs];
      updated[index] = selectedUser;
      setMemberInputs(updated);
    };
  
    const handleSubmit = async (e) => {
      try {
      e.preventDefault();
      const memberIds = memberInputs.filter(Boolean).map((user) => user._id);
      const newTeamData = {name: teamName, members: memberIds}
      const response = await dispatch(addNewTeamAsync(newTeamData)).unwrap()
      toast.success(response)
      setTeamName('');
      setMemberInputs([null, null, null]);
      const modalInstance = Modal.getInstance(document.getElementById('addNewTeam'))
      modalInstance.hide();
      } catch (error) {
       toast.error(error)
      }
      
    };  


    return (
        <div className="modal fade" id="addNewTeam" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="addNewTeamLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" style={{alignItems: "self-end"}}>
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="addNewTeamLabel">Create New Team</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form onSubmit={handleSubmit}>
      <div className="modal-body">
        <label htmlFor="teamNameInput" className="form-label fw-medium">Team Name</label>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
        <label htmlFor="addMembersInput" className="form-label fw-medium">Add Members</label>
        {memberInputs.map((selectedUser, index) => (
        <div className="mb-2" key={index}>
          <Select
            options={availableUsers}
            value={selectedUser}
            onChange={(user) => handleSelect(index, user)}
            getOptionLabel={(user) => user.name}
            getOptionValue={(user) => user._id}
            placeholder="Member Name"
            isClearable
          />
        </div>
      ))}

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" className="btn btn-primary">
        Create
      </button>
      </div>
      </form>
    </div>
  </div>
</div>
    )
}

export default NewTeamModal