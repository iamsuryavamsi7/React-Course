import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

let usersData = {

    users: [],
    status: "",
    error: false

} 

export const fetchUsers = createAsyncThunk( "user/fetch", async () => {

    const USER_BASE_URL = "http://localhost:7777/api/v1/users";

    try{

        const response = await fetch(USER_BASE_URL, {

            method: "GET",
            headers: {

                "Content-Type": "application/json"

            }

        }) 

        const data = await response.json();

        return data;

    }catch(error) {

        throw error

    }

});

export const userSlice = createSlice({

    name: "userSlice",
    initialState: usersData,
    reducers: {

        deleteUserById: (state, action) => {

            state.users = state.users.filter((user) => user.id != action.payload)

        }

    },

    extraReducers: (builder) => {

        builder.addCase(fetchUsers.pending, (state) => {

            state.status = 'loading'

        })
        .addCase(fetchUsers.fulfilled, (state, action) => {

            state.status = 'completed'

            state.users = action.payload

        })
        .addCase(fetchUsers.rejected, (state, action) => {

            state.status = 'error',

            state.users = [],

            state.error = action.error.message

        } )

    }

});

export const { deleteUserById } = userSlice.actions