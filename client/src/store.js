
import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./features/users/usersSlice";
import projectsSlice from "./features/projects/projectsSlice";
import teamsSlice from "./features/teams/teamsSlice";
import tasksSlice from "./features/tasks/tasksSlice";
import tagsSlice from "./features/tags/tagsSlice";


const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        projects: projectsSlice.reducer,
        teams: teamsSlice.reducer,
        tasks: tasksSlice.reducer,
        tags: tagsSlice.reducer
    }
})

export default store

