import { getMe } from "./WebAPI";

const TOKEN_NAME = "token";

export const getAuthToken = () => {
  return window.localStorage.getItem(TOKEN_NAME);
};

export const setAuthToken = (value) => {
  window.localStorage.setItem(TOKEN_NAME, value);
};

export const checkPermission = async () => {
  const token = getAuthToken();
  if (token === "null") return false;
  const res = await getMe();
  if (res.ok !== 1) return false;
  return true;
};
