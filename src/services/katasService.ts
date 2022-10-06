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

export const getUserByEmail = async (token: string, email: string) => {
  // http://localhost:8000/api/users?email=XXXXXXX
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": token,
    },
    params: {
      email: email,
    },
  };
  return axios.get(`users`, options);
};

export const getKatasFromUser = async (token: string, id: string) => {
  // http://localhost:8000/api/users/katas?id=XXXXXXX
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": token,
    },
    params: {
      id: id,
    },
  };
  return axios.get(`users/katas`, options);
};

export const createKata = async (token: string, kata: any) => {
  // http://localhost:8000/api/katas
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": token,
    },
  };
  return axios.post(`katas`, kata, options);
};

export const updateUser = async (user: any, id: string) => {
  // http://localhost:8000/api/users
  const options: AxiosRequestConfig = {
    headers: {},
    params: {
      id: id,
      name: user.name,
      email: user.email,
      age: user.age,
      katas: user.katas,
    },
  };
  return axios.put(`users`, user, options);
};

export const deleteKata = async (id: string, token: string) => {
  // http://localhost:8000/api/katas
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": token,
    },
    params: {
      id: id,
    },
  };
  return axios.delete(`katas`, options);
};

export const updateKata = async (kata: any, id: string, token: string) => {
  // http://localhost:8000/api/katas
  const options: AxiosRequestConfig = {
    headers: {
      "x-access-token": token,
    },
    params: {
      id: id,
    },
  };
  return axios.put(`katas`, kata, options);
};
