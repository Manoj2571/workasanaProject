import getStatusClassName from "../../utils/getStatusClassName";
import getDueDate from "../../utils/getDueDate";
import AvatarGenerator from "../avatars/AvatarGenerator";
import calculatePriority from "../../utils/calculatePriority";
import getPriorityClassName from "../../utils/getPriorityClassName";
import { useParams } from "react-router-dom"
import { statuses } from "../../pages/TaskManagement";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTaskStatusAsync } from "../../features/tasks/tasksSlice";
import toast from "react-hot-toast";
import getStatusRadioClassName from "../../utils/getStatusRadioClassName";
import React from 'react';



const TaskItem = ({ task }) => {
  const {taskId} = useParams()
  const dispatch = useDispatch()
  const [currentStatus, setCurrentStatus] = useState(task.status)

  const handleChangeStatus = (e) => {
    const status = e.target.value

    dispatch(updateTaskStatusAsync({taskId, status}))
    .then((response) => {
      setCurrentStatus(status)
      toast.success("Staus updated Successfully.")
    })
    .catch((err) => toast.error("Status Update Failed."))
  }
    
    return (
        <>
                {taskId ? <h2 className="mb-3">{task.name}</h2> : <div className="d-flex justify-content-between align-items-center flex-nowrap">
                <h4 className="card-title fw-bold">{task.name}</h4>
                <span className={`badge ${getStatusClassName(task.status)} text-center`} >
                  {task.status}
                </span>
                </div>}
                <AvatarGenerator people={task.owners} num={2} size={35}/>
                <p className=" fw-bold my-2">Due on: {getDueDate(task.createdAt, task.timeToComplete)}</p>
                <div className="text-dark-emphasis fw-medium">
                <p className="mb-1">Team: {task.team.name}</p>
          <p className="mb-1">Project: {task.project.name}</p>
          {task.tags.length > 0 ? <p className="mb-1">
            Tags: {task.tags.join(",")}
          </p> : <p className="">No Tags found</p>}
          <p className="mb-0">Priority: <span className={`${getPriorityClassName(calculatePriority(task))} badge`}>{calculatePriority(task)}</span></p>
          </div >
          {taskId && <div className="btn-group my-4" role="group" aria-label="Basic radio toggle button group">
  {statuses.map(status => 
  <React.Fragment key={status}>
    <input type="radio" className="btn-check" name="btnradio" id={status} autoComplete="off" value={status} checked={currentStatus == status} onChange={handleChangeStatus}/>
    <label className={`btn ${getStatusRadioClassName(status)}`} htmlFor={status} >{status}</label>
  </React.Fragment>)}
</div>}
          </>
    );
  }; 


  export default TaskItem