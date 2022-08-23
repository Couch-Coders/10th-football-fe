import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',
    initialState: {},
    reducers: {
        getUser(state, action) {}
    }
})

export default userSlice;