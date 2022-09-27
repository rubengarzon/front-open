import axios from "../utils/config/axios.config";
/**
 * @description This function is used to login the user
 * @param {string} email  email of the user
 * @param {string} password password of the user
 * @returns Promise
 */
export const login = (email: string, password: string) => {
  let body = {
    email: email,
    password: password,
  };

  return axios.post("/auth/login", body);
};
/**
 * @description This function is used to register the user
 * @param {string} name name of the user
 * @param {string} email email of the user
 * @param {string} password password of the user
 * @param {number} age age of the user
 * @returns Promise
 */
export const register = (
  name: string,
  email: string,
  password: string,
  age: number
) => {
  let body = {
    name: name,
    email: email,
    password: password,
    age: age,
  };

  return axios.post("/auth/register", body);
};
