import SideMenuBar from "../components/navigationBar/SideMenuBar"
import { useEffect, useState } from 'react';
import TaskItem from "../components/tasks/TaskItem";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProjects } from "../features/projects/projectsSlice";
import { fetchUsers } from "../features/users/usersSlice";
import { fetchTeams } from "../features/teams/teamsSlice";
import { fetchTags } from "../features/tags/tagsSlice";

      
export const statuses = ["To Do", "In Progress", "Completed", "Blocked"]
  
  
  export const TaskManagement = () => {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const {projects} = useSelector((state) => state.projects)
    const {teams} = useSelector((state) => state.teams)
    const {users} = useSelector((state) => state.users)
    const {tags} = useSelector((state) => state.tags)

    const [showTags, setShowTags] = useState(false)
    const [showOwners, setShowOwners] = useState(false)

    const [queryParams, setQueryParams] = useState({
      status: searchParams.get('status') || '',
      owners: searchParams.get('owners') ? searchParams.get('owners').split(',') : [],
      tags: searchParams.get('tags') ? searchParams.get('tags').split(',') : [],
      project: searchParams.get('project') || '',
      team: searchParams.get('team') || ''
  })

    const {data: tasks, loading, error} = useFetch("https://workasana-project-server.vercel.app/tasks", searchParams)

    useEffect(() => {
          dispatch(fetchProjects())
          dispatch(fetchUsers())
          dispatch(fetchTeams())
          dispatch(fetchTags())
    }, [])


    useEffect(() => {
      setSearchParams({
        status: queryParams.status ? queryParams.status :  [] ,
        owners: queryParams.owners.length > 0 ? queryParams.owners.join(",") : [] ,
        tags: queryParams.tags.length > 0 ? queryParams.tags.join(",") : [],
        project: queryParams.project ? queryParams.project :  [] ,
        team: queryParams.team ? queryParams.team :  []
      })
    }, [queryParams])


    const multiSelectHandler = (e) => {
      const selected = Array.from(e.target.selectedOptions, option => option.value)
      setQueryParams({...queryParams, [e.target.id]: selected})
    }

    return (
        <div className="d-flex">
            <SideMenuBar />
            <div className="flex-grow-1 px-4 mt-5">

             
              
              <h2>Tasks</h2>
              <div className="d-flex gap-2 flex-wrap my-3">

                {/* Filter By Status */}
                <div>
        <select className="form-select"  id="statusSelect" onChange={(e) => setQueryParams({...queryParams, status: e.target.value})} value={queryParams.status}>
                    <option value="">Filter By Status</option>
                    {statuses.map((status, index) => <option key={index} value={status}>{status}</option>)}
                  </select>
                </div>

                {/* Filter By Project */}
                <div>
        <select className="form-select"  id="projectSelect" onChange={(e) => setQueryParams({...queryParams, project: e.target.value})} value={queryParams.project}>
                    <option value="">Filter By Project</option>
                    {projects.map((project) => <option key={project.name} value={project.name}>{project.name}</option>)}
                  </select>
                </div>

                {/* Filter By Team */}
                <div>
        <select className="form-select"  id="teamSelect" onChange={(e) => setQueryParams({...queryParams, team: e.target.value})} value={queryParams.team}>
                    <option value="">Filter By Team</option>
                    {teams.map((team) => <option key={team._id} value={team.name}>{team.name}</option>)}
                  </select>
                </div>

                {/* Filter By Users */}
                <div >
                  <label htmlFor="ownersSelectInput" className="form-select " onClick={() => setShowOwners(!showOwners)}>Filter By Owners {queryParams.owners.length > 0 && `(${queryParams.owners.length})`}</label>
                  {showOwners && <select id="owners" className="selectpicker form-select" multiple required size="3" title="Choose team members" onChange={multiSelectHandler} value={queryParams.owners}>
                    {users.map(user => <option key={user._id} value={user.name}>{user.name}</option>)}
                  </select>}
                  </div>

                 {/* Filter By Tags */}
                  <div >
                  <label htmlFor="tags" className="form-select " onClick={() => setShowTags(!showTags)}>Filter By Tags {queryParams.tags.length > 0 && `(${queryParams.tags.length})`}</label>
                    {showTags && <select id="tags" className="selectpicker form-select" multiple required size="3" title="Choose tags" onChange={multiSelectHandler} value={queryParams.tags}>
                      {tags.map((tag) => <option key={tag._id} value={tag.name}>{tag.name}</option>)}
                    </select>}
                  </div>
              </div>

        <div className="row my-4">
          {loading && <div className="text-center my-5">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>}
          {tasks && !loading && tasks?.map(task => (
            <div className="col-md-6 mb-3">
              <div className="card p-3 bg-light border-0">
                <TaskItem key={task._id} task={task}/>
              </div>
            </div>
            
          ))}
          {
           tasks?.length == 0 && !loading && <p className="text-start text-danger fw-medium mx-2">No Tasks Found</p>
          }
        </div>
      </div>

        </div>
      
    );
  };
  

export default TaskManagement