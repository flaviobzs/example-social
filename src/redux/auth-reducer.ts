import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookie from 'js-cookie';
import * as userAPI from "../firebase/firestore/user";
import { UpdateUserData, User, userConverter, userIsLoggedIn } from "../models/user";
import * as authAPI from '../firebase/auth';
import { uploadFile } from "../firebase/storage";

let initialState = {
    isAuth: false,
    user: null as User | null,
}

const USERS_UID = 'USERS_UID';

export const syncUser = createAsyncThunk(
    'AUTH/SYNC-USER',
    async (_, thunkAPI) => {
        const savedUID = Cookie.get(USERS_UID)
        if (savedUID !== undefined) {
            const user = await userAPI.getUser(savedUID);
            const loggedIn = user !== null && userIsLoggedIn(user);
            return { loggedIn: loggedIn, user: user }
        }
        return { loggedIn: false, user: null }
    }
)

export const googleLogIn = createAsyncThunk(
    'AUTH/GOOGLE-LOGIN',
    async (_, thunkAPI) => {
        const fireAuthUser = await authAPI.signInWithGoogle()
        if (fireAuthUser !== null) {
            let user = await userAPI.getUser(fireAuthUser.uid)
            if (user === null) {
                user = userConverter.fromFireBaseUser(fireAuthUser)
            }
            const isLoggedIn = userIsLoggedIn(user)
            if (isLoggedIn) {
                Cookie.set(USERS_UID, user.uid);
            }
            return { loggedIn: isLoggedIn, user: user }
        } else {
            return { loggedIn: false, user: null }
        }
    }
)

export const logOut = createAsyncThunk(
    'AUTH/LOG-OUT',
    async () => {
        await authAPI.signOut();
        Cookie.remove(USERS_UID);
    }
)

export const updateUserImage = createAsyncThunk(
    'AUTH/UPDATE-USERS-IMAGE',
    async ({ file, uid }: { file: File | Blob, uid: string }) => {
        const imageURL = await uploadFile(file);
        await userAPI.updateUsersImageURL(uid, imageURL);
        return { imageURL: imageURL };
    }
)

export const completeUser = createAsyncThunk(
    'AUTH/COMPLETE-USERS-INFO',
    async (userData: UpdateUserData, thunkAPI) => {
        const user = await privateUpdateUserInfo(userData)
        const isLoggedIn = user !== null;
        if (isLoggedIn) {
            Cookie.set(USERS_UID, user!.uid);
        }
        return {loggedIn: isLoggedIn, user: user}
    }
)

export const updateUserInfo = createAsyncThunk(
    'AUTH/UPDATE-USERS-INFO',
    async (userData: UpdateUserData) => {
        const user = await privateUpdateUserInfo(userData)
        return {user: user}
    }
)

const privateUpdateUserInfo = async (userData: UpdateUserData): Promise<User | null> => {
    await userAPI.updateUser(userData);
    const updatedUser = await userAPI.getUser(userData.uid);
    return updatedUser
}

const authSlice = createSlice({
    name: 'AUTH',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(syncUser.fulfilled, (state, action) => {
            state.isAuth = action.payload.loggedIn;
            state.user = action.payload.user
        });
        builder.addCase(googleLogIn.fulfilled, (state, action) => {
            state.isAuth = action.payload.loggedIn;
            state.user = action.payload.user;
        });
        builder.addCase(logOut.fulfilled, (state, _) => {
            state.isAuth = false;
            state.user = null;
        });
        builder.addCase(updateUserImage.fulfilled, (state, action) => {
            const user: User | null = state.user === null ? null : { ...state.user, photoUrl: action.payload.imageURL }
            state.user = user
        });
        builder.addCase(updateUserInfo.fulfilled, (state, action) => {
            state.user = action.payload.user;
        });
        builder.addCase(completeUser.fulfilled, (state, action) => {
            state.isAuth = action.payload.loggedIn;
            state.user = action.payload.user;
        });
    }
})

export default authSlice.reducer