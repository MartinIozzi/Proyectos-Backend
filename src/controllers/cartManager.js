import fs from 'fs';
import ProductManager from "./productManager.js";

let productManager = new ProductManager();

class CartManager {
    constructor() {
        this.path = "./src/models/carts.json"
        this.id = 0;
        this.products = [] 

        if (!(fs.existsSync(this.path))) {
            fs.writeFileSync(
                this.path,
                JSON.stringify([]))
        }else{
            this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }
        let index = this.products.length - 1   //detecta el ultimo index y asigna la id del mismo.
        if(index >= 0){
            this.id = this.products[index].id
        }
    }

    async updateCarts () {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    }

    async getCart (){
        try {
            return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
        } catch (e) {
            console.log(500, e);
        }
    };

    async addCart(cartId, product){
        let index = this.products.findIndex(carrito => carrito.id == cartId);
        if(index == -1){
            this.id++;
            let carrito = {
                cart: [product],    //esto es lo mismo que pushear el producto abajo
                id: this.id
            }
            product.quantity = 1;
            this.products.push(carrito);
            this.updateCarts();
            return;
        }

        let carritoUsuario = this.products[index].cart;
        let indexProducto = carritoUsuario.findIndex(producto => producto.id == product.id)
        if(indexProducto == -1){
            product.quantity = 1;
            this.products[index].cart.push(product)
            return this.updateCarts();
        }

        let cantidad = carritoUsuario[indexProducto].quantity + 1
        this.products[index].cart[indexProducto].quantity = cantidad
        this.updateCarts();
    }
}

export default CartManager;