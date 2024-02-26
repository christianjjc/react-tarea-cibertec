import { BtnGeneral, Title } from "../../components";

export const ProductsPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <Title titulo="Listado de Productos" subtitulo="En esta sección veremos la lista completa de productos." />
        </div>
      </div>
      <div className="row d-flex justify-content-end pb-3">
        <div className="col-12 col-sm-2">
          <BtnGeneral href={"#"} label={"Nuevo"} />
        </div>
      </div>
      <div className="row">
        <div className="col-12">{children}</div>
      </div>
    </>
  );
};
