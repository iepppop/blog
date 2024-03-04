import { combineReducers } from "redux";
import  userSlice  from "../features/userSlice.js";
import  dataSlice  from "../features/dataSlice.js";

export const rootReducer = combineReducers({
    user: userSlice,
    data: dataSlice
})