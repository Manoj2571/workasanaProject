import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast";

export const fetchUsers = createAsyncThunk("/users/fetchUsers", async () => {
    const response = await axios.get(
      "https://workasana-project-server.vercel.app/users"
    );
  
    return response.data;
  });

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        status: "idle",
        error: null,
        loggedInUser: {},
        isUserLoggedIn: false
    },
    reducers: {
        setLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload
            state.isUserLoggedIn = true
        },
        addNewUser: (state, action) => {
            state.users = [...state.users, action.payload]
        },
        logoutUser: (state, action) => {
            state.isUserLoggedIn = false
            state.loggedInUser = {}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => {
          state.status = "loading";
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
          state.status = "success";
          state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload;
        });
      }
})

export const {setLoggedInUser, addNewUser, logoutUser} = usersSlice.actions

export const loginUserAsync = createAsyncThunk("/users/loginUser", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("https://workasana-project-server.vercel.app/auth/login", userData)

            localStorage.setItem("authToken", response.data.token)
            thunkAPI.dispatch(setLoggedInUser(response.data?.user))
 
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
})

export const signupUserAsync = createAsyncThunk("/users/signupUser", async (newUserData, thunkAPI) => {
    try {
        const response = await axios.post("https://workasana-project-server.vercel.app/auth/signup", newUserData)

        thunkAPI.dispatch(addNewUser(response.data?.user))
        toast.success("Account created successfully. Please log in to continue.")
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
})


export default usersSlice