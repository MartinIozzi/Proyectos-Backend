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
    }

    async getProdFromCart (){
        try {
            const actualProducts = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(actualProducts);
        } catch (error) { 
            console.log(500, "error en el servidor");
        }
    };
        /*let cartProd = await productManager.getProducts()
        return cartProd;*/

    async addProductToCart (cart){
        try {
            const listCart = await productManager.readCodes();
            
            this.id++;
            cart.id = this.id.toString(); 
            this.products.push(cart);

            listCart.push(this.products);
            return listCart;

        } catch (err) {
            console.log(err);
        }
    }
}

export default CartManager;