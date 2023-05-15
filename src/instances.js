import CartManager from "./controllers/cartManager";
import ProductManager from "./controllers/productManager";

export const listaProductos = new ProductManager();
export const listaCarrito = new CartManager();