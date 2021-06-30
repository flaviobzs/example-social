import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { syncUser } from "./auth-reducer";

let initialState = {
    initialized: false,
}

export const initializeApp = createAsyncThunk(
    'APP/INITIALIZE',
    async (_, thunkAPI) => {
        await thunkAPI.dispatch(syncUser())
    },
);

const appSlice = createSlice({
    name: 'APP',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initializeApp.fulfilled, (state, action) => {
            state.initialized = true;
        });
    }
})

export default appSlice.reducer;