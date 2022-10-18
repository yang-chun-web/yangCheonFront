import axios from "axios";

export const login = async (userInfo) => {
  await axios.post("/user/user-login", userInfo);
};

export const logout = async () => {
  await axios.get("/user/logout");
};

export const boardRegister = async (formData) => {
  await axios.post("/board/board-register", formData);
};

export const remove = async (textId) => {
  await axios.post("/board/board-delete", textId);
};

export const paging = async () => {
  await axios.post("/board-nextPage");
};
