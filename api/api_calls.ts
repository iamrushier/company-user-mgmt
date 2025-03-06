import axios from "axios";
import { IAuthResponseFailure, IAuthResponseSuccess, IUser } from "../types";

const companyAPI = axios.create({
  baseURL: "https://json-placeholder.mock.beeceptor.com",
});

export const tryLoginForUser = async (
  username: string,
  password: string
): Promise<IAuthResponseSuccess | IAuthResponseFailure> => {
  const response = await companyAPI.post("/login", {
    username,
    password,
  });
  return response.data;
};

export const getAllUsers = async (): Promise<IUser[]> => {
  const response = await companyAPI.get("/users");
  return response.data;
};
