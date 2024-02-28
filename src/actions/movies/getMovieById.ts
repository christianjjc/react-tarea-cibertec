import axios from "axios";
import environment from "../../environments/environment.dev";
import { Movie } from "../../interfaces";

const API_URL = `${environment.apiUrl}/movies`;

export const getMovieById = async (id: string): Promise<Movie> => {
  return axios.get<Movie>(`${API_URL}/${id}`).then((response) => {
    return response.data;
  });
};
