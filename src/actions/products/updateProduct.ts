import axios from "axios";
import environment from "../../environments/environment.dev";
import { Product } from "../../interfaces";

const API_URL = `${environment.apiUrl}/products`;

export const updateProduct = async (updateProduct: Product) => {
  return axios.put(API_URL, updateProduct).then((response) => {
    return response.data;
  });
};
