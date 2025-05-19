import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast";

export const fetchUsers = createAsyncThunk("/users/fetchUsers", async () => {
    const response = await axios.get(
      "http://localhost:8000/users"
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

export const {setLoggedInUser, addNewUser} = usersSlice.actions

export const loginUserAsync = createAsyncThunk("/users/loginUser", async (userData, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:8000/auth/login", userData)

            localStorage.setItem("authToken", response.data.token)
            thunkAPI.dispatch(setLoggedInUser(response.data?.user))
 
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
})

export const signupUserAsync = createAsyncThunk("/users/signupUser", async (newUserData, thunkAPI) => {
    try {
        const response = await axios.post("http://localhost:8000/auth/signup", newUserData)

        thunkAPI.dispatch(addNewUser(response.data?.user))
        toast.success("Account created successfully. Please log in to continue.")
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
})

// export const authenticateUserAsync = createAsyncThunk("/users/authenticateUser", async (thunkAPI) => {
//     try {
//         const token = localStorage.getItem("authToken")
//         const user = await axios.get("http://localhost:8000/auth/me", {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })

//         console.log(user)

//         thunkAPI.dispatch(setLoggedInUser(user))
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data.message)
//     }
// })

export default usersSlice