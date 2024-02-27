import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../interfaces";
import { ProductService } from "../../services";

export const ProductMant = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  async function mostrarProducto() {
    if (id !== "new") {
      try {
        const fetchedProduct = await ProductService.getProductById(id!);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error mostrando producto:", error);
      }
    }
  }

  useEffect(() => {
    mostrarProducto();
    //** IMPORTANTE ESLINT DISABLED */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="row">
        <div className="col">
          <form>
            <div className="row">
              <div>Producto id:{id}</div>
              <div className="d-flex flex-column  my-2">
                <span>title</span>
                <input
                  type="text"
                  className="p-2 border rounded-md bg-gray-200"
                  id="title"
                  defaultValue={product?.title}
                />
              </div>

              <div className="d-flex flex-column  my-2">
                <span>price</span>
                <input
                  type="text"
                  className="p-2 border rounded-md bg-gray-200"
                  id="price"
                  defaultValue={product?.price}
                />
              </div>

              <div className="d-flex flex-column  my-2">
                <span>description</span>
                <textarea
                  className="p-2 border rounded-md bg-gray-200"
                  id="description"
                  defaultValue={product?.description}
                />
              </div>
              <div className="d-flex flex-column  my-2">
                <span>category</span>
                <input
                  type="text"
                  className="p-2 border rounded-md bg-gray-200"
                  id="category"
                  defaultValue={product?.category}
                />
              </div>
              <div className="d-flex flex-column  my-2">
                <span>category</span>
                <input
                  type="text"
                  className="p-2 border rounded-md bg-gray-200"
                  id="category"
                  defaultValue={product?.image}
                />
              </div>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-primary">Guardar</button>
              <button className="btn btn-danger">Eliminar</button>
              <Link className="btn btn-info" to={"/products"}>
                Volver
              </Link>
            </div>
          </form>
        </div>
        <div className="col">
          <img className="img-fluid" src={product?.image} alt={product?.title} />
        </div>
      </div>
    </>
  );
};
