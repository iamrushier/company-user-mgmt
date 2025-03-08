import axios from "axios";
import {
  IAuthResponseFailure,
  IAuthResponseSuccess,
  IBlog,
  ICompany,
  ICredentials,
  IRole,
  IUser,
} from "../types";

const companyAPI = axios.create({
  baseURL: "https://json-placeholder.mock.beeceptor.com",
});

export const tryLoginForUser = async (
  credentials: ICredentials
): Promise<IAuthResponseSuccess | IAuthResponseFailure> => {
  const response = await companyAPI.post("/login", credentials); // Useless API, returns failre only if password=="failed-password"
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

export const getAllComments = async (): Promise<IBlog[]> => {
  const response = await companyAPI.get("/comments");
  return response.data;
};
