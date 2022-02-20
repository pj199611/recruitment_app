import { Close, Logout } from "./LogoutActionTypes";

export const CLOSE = () => {
  return {
    type: Close,
  };
};

export const LOGOUT = () => {
  return {
    type: Logout,
  };
};
