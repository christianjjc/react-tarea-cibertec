import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Movie } from "../../interfaces";
import { MovieService } from "../../services";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import { ErrorMensaje, Title } from "..";
import { useAppSelector } from "../../store";

interface FormInputs {
  title: string;
  year: string;
  type: string;
  poster: string;
}

export const MovieMant = () => {
  const globalProduct = useAppSelector((state) => state.globalProduct.product); //* Probando el estado Global de Redux

  const [movie, setMovie] = useState<Movie>();
  const { id } = useParams();

  const types = ["game", "movie", "series"];

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>();

  async function mostrarPelicula() {
    if (id !== "new") {
      try {
        const fetchedMovie = await MovieService.getMovieById(id!);
        setMovie(fetchedMovie);
      } catch (error) {
        console.error("Error mostrando producto:", error);
      }
    }
  }

  useEffect(() => {
    mostrarPelicula();
    //** IMPORTANTE ESLINT DISABLED */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (movie) {
      setValue("title", movie.title);
      setValue("year", movie.year);
      setValue("type", movie.type);
      setValue("poster", movie.poster);
    }
  }, [movie, setValue]);

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    console.log({ data });

    const { ...movieToSave } = data;

    const formData = new FormData();

    if (id !== "new") {
      formData.append("id", id ?? "");
    }

    formData.append("title", movieToSave.title ?? "");
    formData.append("year", movieToSave.year ?? "");
    formData.append("type", movieToSave.type ?? "");
    formData.append("poster", movieToSave.poster ?? "");

    console.log({ formData });

    if (id?.toLowerCase() === "new") {
      const pelicula = MovieService.addMovie(formData);
      console.log(pelicula);
      return pelicula;
    } else {
      try {
        const pelicula = MovieService.updateMovie(formData);
        console.log(pelicula);
        return pelicula;
      } catch (error) {
        console.log({ error_modificar_peli_en_form: error });
      }
    }
  };

  const handleEliminar = async (id: string, title: string) => {
    const confirmar = confirm(`¿Seguro que desea eliminar el item ${title}?`);
    if (!confirmar) return;
    try {
      await MovieService.deleteMovie(id);
      alert("¡Registro eliminado con éxito!");
      window.location.replace("/movies");
    } catch (error) {
      alert("No se pudo eliminar el registro.");
      console.log(error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <Title titulo="Mantenimiento de Películas" subtitulo="Aquí se gestionan las películas." />
        </div>
      </div>
      <div className="row d-flex my-5">
        <div className="col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <span className="fs-4">Producto id: {id}</span>
              <div className="d-flex flex-column  my-2">
                <span>Nombre:</span>
                <input
                  type="text"
                  className={clsx("p-2 border rounded-md form-control ", {
                    "border-danger": errors.title,
                  })}
                  id="title"
                  autoFocus
                  {...register("title", { required: true })}
                />
                <ErrorMensaje atributo="Título" error={errors.title} />
              </div>
              <div className="d-flex flex-column  my-2">
                <span>Año:</span>
                <input
                  type="text"
                  maxLength={9}
                  className={clsx("p-2 border rounded-md form-control", {
                    "border-danger": errors.year,
                  })}
                  id="price"
                  {...register("year", { required: true, min: 1900 })}
                />
                <ErrorMensaje atributo="Año" error={errors.year} minimo={1900} />
              </div>
              <div className="d-flex flex-column  my-2">
                <span>Tipo:</span>
                <select
                  className={clsx("p-2 border rounded-md form-select ", {
                    "border-danger": errors.type,
                  })}
                  {...register("type", { required: true })}>
                  <option value="">[Seleccione]</option>
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <ErrorMensaje atributo="Tipo" error={errors.type} />
              </div>
              <div className="d-flex flex-column  my-2">
                <span>Poster:</span>
                <input
                  type="url"
                  className={clsx("p-2 border rounded-md form-control", {
                    "border-danger": errors.poster,
                  })}
                  id="image"
                  {...register("poster", { required: true })}
                />
              </div>
              <ErrorMensaje atributo="Poster" error={errors.poster} />
            </div>
            <div className="d-flex gap-2 my-3">
              <button type="submit" className="btn btn-primary">
                {movie ? "Modificar" : "Guardar"}
              </button>
              {movie ? (
                <button className="btn btn-danger" onClick={() => handleEliminar(id!, movie.title)}>
                  Eliminar
                </button>
              ) : (
                ""
              )}
              <Link className="btn btn-info" to={"/movies"}>
                Volver
              </Link>
            </div>
          </form>
        </div>
        <div className="col">
          <img className="img-fluid img-form" src={movie?.poster} alt={movie?.title} />
        </div>
      </div>

      <div>
        <div className="row fw-bold d-flex my-3">
          <span className="col-6 col-md-2">Producto Global</span>
          <span className="fw-normal col-6 col-md-10">(usando Redux)</span>
        </div>
        <div className="row text-start lead">
          <pre>{JSON.stringify(globalProduct, null, " ")}</pre>
        </div>
      </div>
    </>
  );
};
