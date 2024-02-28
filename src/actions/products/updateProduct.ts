import axios from "axios";
import environment from "../../environments/environment.dev";
//import { Product } from "../../interfaces";

const API_URL = `${environment.apiUrl}/products`;

export const updateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const product = data;
  const { id, ...rest } = product;
  try {
    return axios.put(`${API_URL}/${id}`, rest).then((response) => {
      return response.data;
    });
  } catch (error) {
    return error;
  }
};
