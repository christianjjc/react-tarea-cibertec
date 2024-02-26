import { BtnGeneral, ProductList, Title } from "../../components";

export const ProductsPage = () => {
  return (
    <>
      <div className="row">
        <Title titulo="Listado de Productos" subtitulo="En esta sección veremos la lista completa de productos." />
      </div>
      <div className="row d-flex justify-content-end">
        <div className="col-12 col-sm-2">
          <BtnGeneral href={"#"} label={"Nuevo"} />
        </div>
      </div>
      <div className="row">
        <ProductList />
      </div>
    </>
  );
};
