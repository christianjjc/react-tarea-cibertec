import { Link } from "react-router-dom";
import { Product } from "../../interfaces";
import imgTrash from "/trash3.svg";
import imgModify from "/modify-ico.png";
import { ProductService } from "../../services";
import { currencyFormat } from "../../utils";

interface Props {
  product: Product;
}

export const ProductRow = ({ product }: Props) => {
  const { id, title, price, description, category, image } = product;

  const handleEliminar = async (id: string, title: string) => {
    const confirmar = confirm(`¿Seguro que desea eliminar el item ${title}?`);
    if (!confirmar) return;
    try {
      await ProductService.deleteProduct(id);
      alert("¡Registro eliminado con éxito!");
      window.location.replace("/products");
    } catch (error) {
      alert("No se pudo eliminar el registro.");
      console.log(error);
    }
  };

  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{title}</td>
      <td>{currencyFormat(price)}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>
        <img className="produt-image img-fluid " src={image} alt={title} />
      </td>
      <td>
        <Link id={`md-${id}`} to={`/products/${id}`} className="btn" onClick={() => {}}>
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
