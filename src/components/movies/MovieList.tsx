import { useEffect, useState } from "react";
import { Movie } from "../../interfaces";
import { MovieService } from "../../services";
import { MovieRow } from "./MovieRow";
import { BtnGeneral, Title } from "..";

export const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loaded, setLoaded] = useState(false);

  async function cargaMovies() {
    try {
      const movies = await MovieService.getMovies();
      setMovies(movies);
      setLoaded(true);
    } catch (error) {
      console.error("Error cargando elículas:", error);
    }
  }

  useEffect(() => {
    cargaMovies();
  }, []);

  if (!loaded) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center spinner-container gap-3 ">
        <div className="spinner-border text-primary fs-1" role="status">
          {/* <span className="visually-hidden">Loading...</span> */}
        </div>
        <span className="fs-2">Cargando...</span>
      </div>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <Title titulo="Listado de Películas" subtitulo="En esta sección veremos la lista completa de películas." />
        </div>
      </div>
      <div className="row d-flex justify-content-end pb-3">
        <div className="col-12 col-sm-2">
          <BtnGeneral href={"/movies/new"} label={"Nueva Película"} />
        </div>
      </div>
      <table className="table table-sm table-striped table-hover table-bordered table align-middle table-responsive">
        <thead className="table-dark">
          <tr className="text-center ">
            <th scope="col">id</th>
            <th scope="col">title</th>
            <th scope="col">Año</th>
            <th scope="col">tipo</th>
            <th scope="col">poster</th>
            <th scope="col">Modif</th>
            <th scope="col">Del</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {movies.map((m) => (
            <MovieRow key={m.id + m.title + m.year} movie={m} />
          ))}
        </tbody>
      </table>
    </>
  );
};
