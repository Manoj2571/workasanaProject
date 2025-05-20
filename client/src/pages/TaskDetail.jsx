import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import SideMenuBar from "../components/navigationBar/SideMenuBar"
import TaskItem from "../components/tasks/TaskItem"
import EditTaskModel from "../components/tasks/EditTaskModel"
import { deleteTaskAsync } from "../features/tasks/tasksSlice"
import toast from "react-hot-toast"

const TaskDetail = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {taskId} = useParams()

    const {tasks, tasksStatus} = useSelector((state) => state.tasks)

    const currentTask = tasks.find(task => task._id == taskId)

    const deleteHandler = async () => {
        try {
                const response = await dispatch(deleteTaskAsync({taskId})).unwrap()
                toast.success(response)
                navigate("/dashboard")
        } catch (error) {
            toast.error(error)
        }
    }


    return (
        <div className="d-flex">
            <SideMenuBar />
            {tasksStatus == "success" && <div className="flex-grow-1 px-4 mt-5 pt-4">
                    <TaskItem task={currentTask}/>
                    <div className="d-flex gap-3 align-items-center">
                        <button className="btn btn-primary" data-bs-toggle="modal" type="button" data-bs-target="#editTask">Edit</button>
                        <button className="btn btn-danger" onClick={deleteHandler}>Delete</button>
                    </div> 
                    <EditTaskModel task={currentTask}/>
            </div>}
        </div>
    )
}

export default TaskDetail
