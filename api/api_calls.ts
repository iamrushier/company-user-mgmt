import axios from "axios";
import {
  IAuthResponseFailure,
  IAuthResponseSuccess,
  IBlog,
  ICompany,
  IRole,
  IUser,
} from "../types";

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

export const getAllCompanies = async (): Promise<ICompany[]> => {
  const response = await companyAPI.get("/companies");
  return response.data;
};

export const getAllRoles = async (): Promise<IRole[]> => {
  const response = await companyAPI.get("/roles");
  return response.data;
};

export const getAllBlogs = async (): Promise<IBlog[]> => {
  const response = await companyAPI.get("/posts");
  return response.data;
};
