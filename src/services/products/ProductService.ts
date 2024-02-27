import { addProduct, deleteProduct, getProducts, getProductsById, updateProduct } from "../../actions";
import { Product } from "../../interfaces";

export const ProductService = {
  getProducts: async () => {
    return await getProducts();
  },
  getProductById: async (id: string) => {
    return await getProductsById(id);
  },
  deleteProduct: (id: string) => {
    return deleteProduct(id);
  },
  addProduct: (product: Product) => {
    return addProduct(product);
  },
  updateProduct: (product: Product) => {
    return updateProduct(product);
  },
};
