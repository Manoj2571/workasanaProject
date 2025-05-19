import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchTeams = createAsyncThunk("/teams/fetchTeams", async () => {
    const response = await axios.get("http://localhost:8000/teams")
    return response.data
})


const teamsSlice = createSlice({
    name: "teams",
    initialState: {
        teams: [],
        teamsStatus: "idle"
    },
    reducers: {
        addNewTeam: (state, action) => {
            state.teams = [...state.teams, action.payload]
        },
        updateTeam: (state, action) => {
            const teamIndex = state.teams.findIndex(team => team._id == action.payload._id) 
            state.teams[teamIndex] = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTeams.pending, (state, action) => {
            state.teamsStatus = "loading..."
        });
        builder.addCase(fetchTeams.fulfilled, (state, action) => {
            state.teamsStatus ="success";
            state.teams = action.payload
        });
        builder.addCase(fetchTeams.rejected, (state, action) => {
            state.teamsStatus = "error";
            state.error = action.payload
        });
    }
})

export const {addNewTeam, updateTeam} = teamsSlice.actions

export const addNewTeamAsync = createAsyncThunk("/teams/addNewTeam", async (teamData, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:8000/teams", teamData)

        thunkAPI.dispatch(addNewTeam(response.data.team))

        return response.data?.message
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message)
    }
})

export const addNewTeamMemberAsync = createAsyncThunk("/teams/addNewTeamMember", async (memberData, thunkAPI) => {
    try {
        const response = await axios.post(`http://localhost:8000/teams/${memberData.teamId}/member`, {member: memberData.member})

        thunkAPI.dispatch(updateTeam(response.data.team))

        return response.data?.message
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data?.message)
    }
})

export default teamsSlice