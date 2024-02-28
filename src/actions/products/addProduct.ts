import axios from "axios";
import environment from "../../environments/environment.dev";
//import { Product } from "../../interfaces";

const API_URL = `${environment.apiUrl}/products`;

export const addProduct = async (formData: FormData) => {
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
