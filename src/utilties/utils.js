import cookie from "js-cookie";

export const setCookie = (key, value) => {
  if (key) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const setLocalStorage = (key, value) => {
  if (key) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const authenticate = (data) => {
  const {data:{data:{token,userRole,name}}}=data;
  setCookie("token", token);
  setLocalStorage("user", userRole);
  setLocalStorage("name", name);
};

export const checkRole = () => {
  const roleAuthObj = {
    candidate: false,
    recruiter: false,
  };

  if (JSON.parse(localStorage.getItem("user")) === 0) {
    roleAuthObj["recruiter"] = true;
  }

  if (JSON.parse(localStorage.getItem("user")) === 1) {
    roleAuthObj["candidate"] = true;
  }

  return {
    roleAuthObj: roleAuthObj,
    name: JSON.parse(localStorage.getItem("name")),
  };
};

export const getCookie = (key) => {
  return cookie.get(key);
};

export const signout = (key) => {
  removeCookie(key);
  removelocalstorage("user", "name");
};

export const removeCookie = (key) => {
  if (key) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const removelocalstorage = (user, name) => {
  if (user && name) {
    localStorage.removeItem(user);
    localStorage.removeItem(name);
  }
};

export const resetpasswordtoken = (resetToken) => {
  setCookie("resetToken", resetToken);
};
