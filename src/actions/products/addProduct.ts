import axios from "axios";
import environment from "../../environments/environment.dev";
import { Product } from "../../interfaces";

const API_URL = `${environment.apiUrl}/products`;

export const addProduct = async (product: Product) => {
  return axios.post(API_URL, product).then((response) => {
    return response.data;
  });
};
