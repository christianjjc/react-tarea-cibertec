import { useEffect, useState } from "react";
import { Product } from "../../interfaces";
import { ProductService } from "../../services";
import { ProductRow } from "./ProductRow";

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  async function cargaProductos() {
    const productos = await ProductService.getProducts();
    setProducts(productos);
    setLoaded(true);
  }

  useEffect(() => {
    setTimeout(() => {
      cargaProductos();
    }, 1500);
  }, []);

  if (!loaded) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center spinner-container gap-3 ">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="fs-5">Cargando...</span>
      </div>
    );
  }

  return (
    <>
      <table className="table table-sm table-striped table-hover table-bordered table align-middle table-responsive">
        <thead className="table-dark">
          <tr className="text-center ">
            <th scope="col">id</th>
            <th scope="col">title</th>
            <th scope="col">price</th>
            <th scope="col">description</th>
            <th scope="col">category</th>
            <th scope="col">image</th>
            <th scope="col">rating</th>
            <th scope="col">Modif</th>
            <th scope="col">Del</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {products.map((p) => (
            <ProductRow key={p.id + p.title} product={p} />
          ))}
        </tbody>
      </table>
    </>
  );
};
