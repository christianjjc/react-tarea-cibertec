import { addProduct, deleteProduct, getProducts, getProductsById, updateProduct } from "../../actions";
//import { Product } from "../../interfaces";

export const ProductService = {
  getProducts: () => {
    return getProducts();
  },
  getProductById: (id: string) => {
    return getProductsById(id);
  },
  deleteProduct: (id: string) => {
    return deleteProduct(id);
  },
  addProduct: (formData: FormData) => {
    return addProduct(formData);
  },
  updateProduct: (formData: FormData) => {
    return updateProduct(formData);
  },
};
