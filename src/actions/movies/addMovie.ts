import axios from "axios";
import environment from "../../environments/environment.dev";
//import { Product } from "../../interfaces";

const API_URL = `${environment.apiUrl}/movies`;

export const addMovie = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const product = data;
  try {
    return axios.post(API_URL, product).then((response) => {
      return response.data;
    });
  } catch (error) {
    return error;
  }
};
