import { Link } from "react-router-dom";
import { Movie } from "../../interfaces";
import imgTrash from "/trash3.svg";
import imgModify from "/modify-ico.png";
import { MovieService } from "../../services";

interface Props {
  movie: Movie;
}

export const MovieRow = ({ movie }: Props) => {
  const { id, title, year, type, poster } = movie;

  const handleEliminar = async (id: string, title: string) => {
    const confirmar = confirm(`¿Seguro que desea eliminar la película ${title}?`);
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
    <tr>
      <th scope="row">{id}</th>
      <td>{title}</td>
      <td>{year}</td>
      <td>{type}</td>
      <td className="text-center">
        <img className="grid-image" src={poster} alt={title} />
      </td>
      <td>
        <Link id={`md-${id}`} to={`/movies/${id}`} className="btn" onClick={() => {}}>
          <img src={imgModify} className="img-mant" alt="Eliminar" />
        </Link>
      </td>
      <td className="text-dang">
        <button id={`dl-${id}`} className="btn" onClick={() => handleEliminar(id!.toString(), title)}>
          <img src={imgTrash} className="img-mant" alt="Eliminar" />
        </button>
      </td>
    </tr>
  );
};
