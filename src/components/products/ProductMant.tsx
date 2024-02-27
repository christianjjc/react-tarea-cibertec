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

  const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];

  const {
    handleSubmit,
    register,
    formState: { isValid },
    setValue,
  } = useForm<FormInputs>();

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

  const onSubmit = async (data: FormInputs) => {
    console.log(data);
    /*const { images, ...productToSave } = data;
    const formData = new FormData(); //*crea un objetoformulario de javascript
    if (product.id) {
      formData.append("id", product.id ?? "");
    }
    formData.append("title", productToSave.title ?? "");
    formData.append("slug", productToSave.slug ?? "");
    formData.append("description", productToSave.description ?? "");
    formData.append("price", productToSave.price.toString() ?? "");
    formData.append("inStock", productToSave.inStock.toString() ?? "");
    formData.append("sizes", productToSave.sizes.toString() ?? "");
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("gender", productToSave.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    console.log({ formData });
    const { ok, product: updatedProduct } = await createUpdateProduct(formData);
    console.log(ok);

    if (!ok) {
      alert("El producto no se pudo actualizar");
      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`); */
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                {/* <input
                  type="text"
                  className="p-2 border rounded-md bg-gray-200"
                  id="category"
                  //defaultValue={product?.category}
                  {...register("category", { required: true })}
                /> */}
                <select className="form-select" {...register("category", { required: true })}>
                  <option value="">[Seleccione]</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex flex-column  my-2">
                <span>Image</span>
                <input
                  type="text"
                  className="p-2 border rounded-md bg-gray-200"
                  id="image"
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
