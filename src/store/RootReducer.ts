import {combineReducers} from "redux";
import LogoutReducer from "./LogoutReducer/LogoutReducer";

 const RootReducer=combineReducers({
    LogoutReducer:LogoutReducer,
})

export default RootReducer;