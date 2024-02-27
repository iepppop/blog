import { combineReducers } from "redux";
import  userSlice  from "../features/userSlice.js";

export const rootReducer = combineReducers({
    user: userSlice
})