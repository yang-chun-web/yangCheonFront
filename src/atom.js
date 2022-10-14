import { atom } from "recoil";

export const access = atom({
  key: "access",
  default: false,
});

export const owner = atom({
  key: "owner",
  default: false,
});
