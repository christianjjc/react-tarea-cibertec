import axios from "axios";
import environment from "../../environments/environment.dev";

const API_URL = `${environment.apiUrl}/movies`;

export const deleteMovie = async (id: string) => {
  return axios.delete(`${API_URL}/${id}`).then((response) => {
    return response.data;
  });
};
