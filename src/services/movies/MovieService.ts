import { addMovie, deleteMovie, getMovies, getMovieById, updateMovie } from "../../actions";

export const MovieService = {
  getMovies: () => {
    return getMovies();
  },
  getMovieById: (id: string) => {
    return getMovieById(id);
  },
  deleteMovie: (id: string) => {
    return deleteMovie(id);
  },
  addMovie: (formData: FormData) => {
    return addMovie(formData);
  },
  updateMovie: (formData: FormData) => {
    return updateMovie(formData);
  },
};
