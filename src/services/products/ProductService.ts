import { addProduct, deleteProduct, getProducts, getProductsById, updateProduct } from "../../actions";
import { Product } from "../../interfaces";

export const ProductService = {
  getProducts: () => {
    return getProducts();
  },
  getProductById: (id: number) => {
    return getProductsById(id);
  },
  deleteProduct: (id: number) => {
    return deleteProduct(id);
  },
  addProduct: (product: Product) => {
    return addProduct(product);
  },
  updateProduct: (product: Product) => {
    return updateProduct(product);
  },
};
