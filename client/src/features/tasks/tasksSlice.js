import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchTasks = createAsyncThunk("/tasks/fetchtasks", async () => {
    const response = await axios.get("https://workasana-project-server.vercel.app/tasks")
    return response.data
})


const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        tasksStatus: "idle"
    },
    reducers: {
        addNewTask: (state, action) => {
            state.tasks = [...state.tasks, action.payload]
        },
        updateTaskStatus: (state, action) => {
            const taskIndex = state.tasks.findIndex(task => task._id == action.payload._id)
            state.tasks[taskIndex].status = action.payload.status
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state, action) => {
            state.tasksStatus = "loading..."
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.tasksStatus ="success";
            state.tasks = action.payload
        });
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.tasksStatus = "error";
            state.error = action.payload
        });
    }
})

export const {addNewTask, updateTaskStatus} = tasksSlice.actions

export const addNewTaskAsync = createAsyncThunk("/tasks/addNewTask", async (taskData, thunkAPI) => {
    try {
        const response = await axios.post("https://workasana-project-server.vercel.app/tasks", taskData)

        thunkAPI.dispatch(addNewTask(response.data?.task))

        return response.data?.message
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const updateTaskStatusAsync = createAsyncThunk("/tasks/updateTask", async (taskData, thunkAPI) => {

    const {taskId, status} = taskData

    try {
        const response = await axios.post(`https://workasana-project-server.vercel.app/tasks/${taskId}`, {status})

        thunkAPI.dispatch(updateTaskStatus(response.data?.task))

        return response.data?.message
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export default tasksSlice