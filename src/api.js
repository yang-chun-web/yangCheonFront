import axios from "axios";

export const login = async (userInfo) => {
  await axios.post("/user/user-login", userInfo);
};

export const logout = async () => {
  await axios.get("/user/logout");
};

export const refreshToken = async () => {
  return await fetch("/user/refresh");
};

export const deleteUser = async (userObjectId) => {
  await axios.post("/user/delete", userObjectId);
};

export const boardRegister = async (formData) => {
  await axios.post("/board/board-register", formData);
};

export const boardEdit = async (formData) => {
  await axios.post("/board/board-update", formData);
};

export const remove = async (textId) => {
  await axios.post("/board/board-delete", textId);
};

export const signUp = async (userInfo) => {
  return await axios.post("/user/signUp", userInfo);
};
