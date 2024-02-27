import axios from "axios";
import environment from "../../environments/environment.dev";
import { Product } from "../../interfaces";

const API_URL = `${environment.apiUrl}/products`;

export const getProductsById = async (id: string): Promise<Product> => {
  return axios.get<Product>(`${API_URL}/${id}`).then((response) => {
    return response.data;
  });
};
