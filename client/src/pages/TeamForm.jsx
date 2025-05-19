import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { fetchUsers } from '../features/users/usersSlice';
import { addNewTeamAsync } from '../features/teams/teamsSlice';
import toast from 'react-hot-toast';

const TeamForm = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const [teamName, setTeamName] = useState('');
  const [memberInputs, setMemberInputs] = useState([null, null, null]); // array of selected user objects

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);



  const availableUsers = () => {
  // Get the IDs of already selected users
  const selectedUserIds = memberInputs.filter((selected) => selected).map((selected) => selected._id);

  // Filter out users whose _id is in the selectedUserIds
  return users.filter((user) => !selectedUserIds.includes(user._id));
};

  const handleSelect = (index, selectedUser) => {
    const updated = [...memberInputs];
    updated[index] = selectedUser;
    setMemberInputs(updated);
  };

  const handleSubmit = (e) => {

    try {
        e.preventDefault();
    const memberIds = memberInputs.filter(Boolean).map((user) => user._id);
    setTeamName('');
    setMemberInputs([null, null, null]);
    const response = dispatch(addNewTeamAsync({name: teamName, members: memberIds})).unwrap()
    toast.success(response)
    // const modalInstance = Modal.getInstance(document.getElementById('addNewTask'))
    // modalInstance.hide();
    } catch (error) {
        toast.error(error)
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="p-3">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
        />
      </div>

      {memberInputs.map((selectedUser, index) => (
        <div className="mb-3" key={index}>
          <Select
            options={availableUsers()}
            value={selectedUser}
            onChange={(user) => handleSelect(index, user)}
            getOptionLabel={(user) => user.name}
            getOptionValue={(user) => user._id}
            placeholder={`Add Member ${index + 1}`}
            isClearable
          />
        </div>
      ))}

      <button type="submit" className="btn btn-primary">
        Create Team
      </button>
    </form>
  );
};

export default TeamForm;
