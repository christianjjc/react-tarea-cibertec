import { useEffect, useState } from "react";
import { Product } from "../../interfaces";
import { ProductService } from "../../services";
import { ProductRow } from "./ProductRow";
import { BtnGeneral, Title } from "..";
import { useAppDispatch } from "../../store";
import { resetProduct } from "../../store/product/productSlice";

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  const dispatch = useAppDispatch();

  async function cargaProductos() {
    try {
      const products = await ProductService.getProducts();
      setProducts(products);
      setLoaded(true);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  }

  useEffect(() => {
    cargaProductos();
  }, []);

  useEffect(() => {
    dispatch(resetProduct());
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Title titulo="Listado de Productos" subtitulo="En esta sección veremos la lista completa de productos." />
        </div>
      </div>
      <div className="row d-flex justify-content-end pb-3">
        <div className="col-12 col-sm-2">
          <BtnGeneral href={"/products/new"} label={"Nuevo Producto"} />
        </div>
      </div>
      <table className="table table-sm table-striped table-hover table-bordered table align-middle table-responsive">
        <thead className="table-dark">
          <tr className="text-center ">
            <th scope="col">id</th>
            <th scope="col">title</th>
            <th scope="col">price</th>
            <th scope="col">description</th>
            <th scope="col">category</th>
            <th scope="col">image</th>
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
