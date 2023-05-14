import CartManager from "./controllers/cartManager";
import ProductManager from "./controllers/productManager";

export const listOfProducts = new ProductManager();
export const listOfCarts = new CartManager();