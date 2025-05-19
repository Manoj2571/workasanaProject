import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const fetchProjects = createAsyncThunk("/projects/fetchProjects", async () => {
    const response = await axios.get("https://workasana-project-server.vercel.app/projects")
    return response.data
})



const projectsSlice = createSlice({
    name: "projects",
    initialState: {
        projects: [],
        projectsStatus: "idle"
    },
    reducers: {
        addNewProject: (state, action) => {
            state.projects = [...state.projects, action.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProjects.pending, (state, action) => {
            state.projectsStatus = "loading"
        });
        builder.addCase(fetchProjects.fulfilled, (state, action) => {
            state.projectsStatus ="success";
            state.projects = action.payload
        });
        builder.addCase(fetchProjects.rejected, (state, action) => {
            state.projectsStatus = "error";
            state.error = action.payload
        });
    }
})

const {addNewProject} = projectsSlice.actions

export const addNewProjectAsync = createAsyncThunk("/projects/addProject", async (newProjectData, thunkAPI) => {

    try {
        const response = await axios.post("https://workasana-project-server.vercel.app/projects", newProjectData)

        thunkAPI.dispatch(addNewProject(response.data?.project))

        return response.data?.message
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
    
})

export default projectsSlice