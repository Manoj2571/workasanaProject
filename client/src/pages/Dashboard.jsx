import SideMenuBar from "../components/navigationBar/SideMenuBar";
import Searchbar from "../components/searchBar/SearchBar";
import ProjectsSection from "../components/projects/ProjectsSection";
import TasksSection from "../components/tasks/TasksSection";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProjects } from "../features/projects/projectsSlice";
import { fetchUsers } from "../features/users/usersSlice";
import { fetchTeams } from "../features/teams/teamsSlice";
import { fetchTags } from "../features/tags/tagsSlice";
import { fetchTasks } from "../features/tasks/tasksSlice";

const Dashboard = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProjects())
    dispatch(fetchUsers())
    dispatch(fetchTeams())
    dispatch(fetchTags())
    dispatch(fetchTasks())
  }, [])


    return (
        <div className='d-flex'>
          <SideMenuBar />
          <div className='flex-grow-1 px-4 mt-4'>
            <Searchbar />
            <ProjectsSection />
            <TasksSection />
          </div>
        </div>
      );
}

export default Dashboard