import { RootState } from "./store";

export const getIsAuth = (state: RootState) => {
    return state.auth.isAuth;
}

export const getUser = (state: RootState) => {
    return state.auth.user;
}
