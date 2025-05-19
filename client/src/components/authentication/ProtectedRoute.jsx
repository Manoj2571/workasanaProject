import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchUsers, setLoggedInUser } from "../../features/users/usersSlice";
import { fetchProjects } from "../../features/projects/projectsSlice";
import { fetchTags } from "../../features/tags/tagsSlice";
import { fetchTeams } from "../../features/teams/teamsSlice";
import { fetchTasks } from "../../features/tasks/tasksSlice";
import toast from "react-hot-toast";


const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const {isUserLoggedIn} = useSelector((state) => state.users);

  const [checkingToken, setCheckingToken] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("authToken");
      if (!isUserLoggedIn) {
        if(token) {
            try {
          const response = await axios.get("https://workasana-project-server.vercel.app/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        dispatch(setLoggedInUser(response?.data))

        await Promise.all([
            dispatch(fetchProjects()),
            dispatch(fetchTags()),
            dispatch(fetchTeams()),
            dispatch(fetchUsers()),
            dispatch(fetchTasks())
        ])
        
        } catch (error) {
          toast.error("An unknown error occured, please login")
        } finally {
          setCheckingToken(false);
        }
        } else {
          setCheckingToken(false)
        }
        
      }
    };

    checkToken();
  }, [dispatch, isUserLoggedIn]);

  if (isUserLoggedIn) {
    return children;
  }

  if (checkingToken) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } 

  if(!checkingToken) {
    return <Navigate to="/login" />
  }
};

export default ProtectedRoute;
