import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../interfaces";
import { ProductService } from "../../services";

export const ProductMant = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    async function mostrarProducto() {
      if (id !== "new") {
        try {
          const fetchedProduct = await ProductService.getProductById(id!);
          setProduct(fetchedProduct);
        } catch (error) {
          console.log(error);
        }
      }
    }

    mostrarProducto();
    // Agregamos el array de dependencias vacío para que este efecto se ejecute solo una vez al montar el componente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <div>Producto id:{id}</div>

        <div className="d-flex flex-column  my-2">
          <span>title</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" id="title" defaultValue={product?.title} />
        </div>

        <div className="d-flex flex-column  my-2">
          <span>price</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" id="price" defaultValue={product?.price} />
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
    </>
  );
};
