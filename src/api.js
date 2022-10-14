import axios from "axios";

export const login = async (userInfo) => {
  await axios.post("/user/user-login", userInfo);
};

export const logout = async () => {
  await axios.get("user/logout");
};
