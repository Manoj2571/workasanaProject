import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import SideMenuBar from "../components/navigationBar/SideMenuBar"
import TaskItem from "../components/tasks/TaskItem"

const TaskDetail = () => {
    const {taskId} = useParams()

    const {tasks} = useSelector((state) => state.tasks)

    const currentTask = tasks.find(task => task._id == taskId)


    return (
        <div className="d-flex">
            <SideMenuBar />
            <div className="flex-grow-1 px-4 mt-5 pt-4">
                    <TaskItem task={currentTask}/>         
            </div>
        </div>
    )
}

export default TaskDetail
