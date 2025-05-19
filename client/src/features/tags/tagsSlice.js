import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const fetchTags = createAsyncThunk("/tags/fetchTags", async () => {
    const response = await axios.get("https://workasana-project-server.vercel.app/tags")
    return response.data
})


const tagsSlice = createSlice({
    name: "tags",
    initialState: {
        tags: [],
        tagsStatus: "idle"
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTags.pending, (state, action) => {
            state.tagsStatus = "loading..."
        });
        builder.addCase(fetchTags.fulfilled, (state, action) => {
            state.tagsStatus ="success";
            state.tags = action.payload
        });
        builder.addCase(fetchTags.rejected, (state, action) => {
            state.tagsStatus = "error";
            state.error = action.payload
        });
    }
})

export default tagsSlice