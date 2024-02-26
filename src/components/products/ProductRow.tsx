import { Link } from "react-router-dom";
import { Product } from "../../interfaces";
import imgTrash from "/trash3.svg";
import imgModify from "/modify-ico.png";
import { ProductService } from "../../services";

interface Props {
  product: Product;
}

export const ProductRow = ({ product }: Props) => {
  const { id, title, price, description, category, image, rating } = product;

  const handleEliminar = async (id: number) => {
    const confirmar = confirm(`¿Seguro que desea eliminar el item con id: ? ${id}`);
    if (!confirmar) return;
    try {
      await ProductService.deleteProduct(id);
      alert("¡Registro eliminado con éxito!");
    } catch (error) {
      alert("No se pudo eliminar el registro.");
      console.log(error);
    }
  };

  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{title}</td>
      <td>{price}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>
        <img className="produt-image img-fluid " src={image} alt={title} />
      </td>
      <td>{rating.rate}</td>
      <td>
        <Link id={`md-${id}`} to={`/products/${id}`} className="btn" onClick={() => {}}>
          <img src={imgModify} className="img-mant" alt="Eliminar" />
        </Link>
      </td>
      <td className="text-dang">
        <Link id={`dl-${id}`} to={`/products/${id}`} className="btn" onClick={() => handleEliminar(id)}>
          <img src={imgTrash} className="img-mant" alt="Eliminar" />
        </Link>
      </td>
    </tr>
  );
};
