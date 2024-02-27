import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../interfaces";
import { ProductService } from "../../services";
import { useForm } from "react-hook-form";

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

  const {
    handleSubmit,
    register,
    formState: { isValid },
    setValue,
  } = useForm<FormInputs>({
    defaultValues: { ...product },
  });

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

  useEffect(() => {
    if (product) {
      setValue("title", product.title);
      setValue("price", product.price);
      setValue("description", product.description);
      setValue("category", product.category);
      setValue("image", product.image);
    }
  }, [product, setValue]);

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
                  //defaultValue={product?.title}
                  {...register("title", { required: true })}
                />
              </div>

              <div className="d-flex flex-column  my-2">
                <span>price</span>
                <input
                  type="text"
                  className="p-2 border rounded-md bg-gray-200"
                  id="price"
                  //defaultValue={product?.price}
                  {...register("price", { required: true })}
                />
              </div>

              <div className="d-flex flex-column  my-2">
                <span>description</span>
                <textarea
                  className="p-2 border rounded-md bg-gray-200"
                  id="description"
                  //defaultValue={product?.description}
                  {...register("description", { required: true })}
                />
              </div>
              <div className="d-flex flex-column  my-2">
                <span>category</span>
                <input
                  type="text"
                  className="p-2 border rounded-md bg-gray-200"
                  id="category"
                  //defaultValue={product?.category}
                  {...register("category", { required: true })}
                />
              </div>
              <div className="d-flex flex-column  my-2">
                <span>category</span>
                <input
                  type="text"
                  className="p-2 border rounded-md bg-gray-200"
                  id="category"
                  //defaultValue={product?.image}
                  {...register("image", { required: true })}
                />
              </div>
            </div>
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
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
