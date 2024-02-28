import axios from "axios";
import environment from "../../environments/environment.dev";
import { Movie } from "../../interfaces";

const API_URL = `${environment.apiUrl}/movies`;

export const getMovies = async (): Promise<Movie[] | []> => {
  return axios.get<Movie[]>(API_URL).then((response) => {
    return response.data;
  });
};
