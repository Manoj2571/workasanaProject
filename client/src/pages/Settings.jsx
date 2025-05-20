import SideMenuBar from "../components/navigationBar/SideMenuBar"
import { useDispatch } from "react-redux"
import { logoutUser } from "../features/users/usersSlice"
import { useNavigate } from "react-router-dom"


const Settings = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        localStorage.removeItem("authToken")
        dispatch(logoutUser())
        navigate("/login")
    }


    return (
       <div className='d-flex'>
          <SideMenuBar />
          <div className='flex-grow-1 px-4 mt-4'>
            <div className="py-5 my-5 mx-3">
                <button className="btn btn-primary" onClick={logoutHandler}>Logout</button>
            </div>
          </div>
        </div> 
    )
}

export default Settings