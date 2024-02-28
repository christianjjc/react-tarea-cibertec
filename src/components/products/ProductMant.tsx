import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../interfaces";
import { ProductService } from "../../services";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import { ErrorMensaje, Title } from "..";
import { useAppDispatch, useAppSelector } from "../../store";
import { productoActual } from "../../store/product/productSlice";

interface FormInputs {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const ProductMant = () => {
  const [product, setProduct] = useState<Product>();
  const { id } = useParams();

  const globalProduct = useAppSelector((state) => state.globalProduct.product);
  const dispatch = useAppDispatch();

  const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>();

  async function mostrarProducto() {
    if (id !== "new") {
      try {
        const fetchedProduct = await ProductService.getProductById(id!);
        dispatch(productoActual(fetchedProduct));
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

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("price", product.price);
      setValue("description", product.description);
      setValue("category", product.category);
      setValue("image", product.image);
    }
  }, [product, setValue]);

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    console.log({ data });

    const { ...productToSave } = data;

    const formData = new FormData();

    if (id !== "new") {
      formData.append("id", id ?? "");
    }

    formData.append("title", productToSave.title ?? "");
    formData.append("price", productToSave.price.toString() ?? 0);
    formData.append("description", productToSave.description ?? "");
    formData.append("category", productToSave.category ?? "");
    formData.append("image", productToSave.image ?? "");

    console.log({ formData });

    if (id?.toLowerCase() === "new") {
      const producto = ProductService.addProduct(formData);
      console.log(producto);
      return producto;
    } else {
      try {
        const producto = ProductService.updateProduct(formData);
        console.log(producto);
        return producto;
      } catch (error) {
        console.log({ error_modificar_prod_en_form: error });
      }
    }
  };

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
    <>
      <div className="row">
        <div className="col-12">
          <Title titulo="Mantenimiento de Productos" subtitulo="Aquí se modifica el producto." />
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
                <span>Precio:</span>
                <input
                  type="text"
                  maxLength={9}
                  className={clsx("p-2 border rounded-md form-control", {
                    "border-danger": errors.price,
                  })}
                  id="price"
                  {...register("price", { required: true, min: 1 })}
                />
                <ErrorMensaje atributo="Precio" error={errors.price} minimo={1} />
              </div>
              <div className="d-flex flex-column  my-2">
                <span>Descripción:</span>
                <textarea
                  className={clsx("p-2 border rounded-md form-control", {
                    "border-danger": errors.description,
                  })}
                  id="description"
                  {...register("description", { required: true })}
                />
                <ErrorMensaje atributo="Descripción" error={errors.description} />
              </div>
              <div className="d-flex flex-column  my-2">
                <span>Categoría:</span>
                <select
                  className={clsx("p-2 border rounded-md form-select ", {
                    "border-danger": errors.category,
                  })}
                  {...register("category", { required: true })}>
                  <option value="">[Seleccione]</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <ErrorMensaje atributo="Categoría" error={errors.category} />
              </div>
              <div className="d-flex flex-column  my-2">
                <span>Imagen:</span>
                <input
                  type="url"
                  className={clsx("p-2 border rounded-md form-control", {
                    "border-danger": errors.image,
                  })}
                  id="image"
                  {...register("image", { required: true })}
                />
              </div>
              <ErrorMensaje atributo="Imagen" error={errors.image} />
            </div>
            <div className="d-flex gap-2 my-3">
              <button type="submit" className="btn btn-primary">
                {product ? "Modificar" : "Guardar"}
              </button>
              {product ? (
                <button className="btn btn-danger" onClick={() => handleEliminar(id!, product.title)}>
                  Eliminar
                </button>
              ) : (
                ""
              )}
              <Link className="btn btn-info" to={"/products"}>
                Volver
              </Link>
            </div>
          </form>
        </div>
        <div className="col">
          <img className="img-fluid img-form" src={product?.image} alt={product?.title} />
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
