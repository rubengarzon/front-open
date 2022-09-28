import { AxiosRequestConfig } from "axios";
import axios from "../utils/config/axios.config";

export const getAllKatas = async (
  token: string,
  limit?: number,
  page?: number
) => {
  // http://localhost:3000/api/katas?limit=1&page=1
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": token,
    },
    params: {
      limit,
      page,
    },
  };
  return axios.get("/katas", options);
};

export const getKataById = async (token: string, id: string) => {
  // http://localhost:8000/api/katas?id=XXXXXXX
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": token,
    },
    params: {
      id,
    },
  };
  return axios.get(`/katas`, options);
};
