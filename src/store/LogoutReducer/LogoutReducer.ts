import * as actionTypes from "./LogoutActionTypes";

const initialstate = {
  logout: false,
};

const LogoutReducer = (state = initialstate, action:any) => {
  switch (action.type) {
    case actionTypes.Logout:
      return {
        ...state,
        logout: true,
      };
    case actionTypes.Close:
        return {
            ...state,
            logout:false
        }
    default:
      return state;
  }
};

export default LogoutReducer;