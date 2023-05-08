import fs from 'fs';
import { Router } from "express";
import ProductManager from '../productManager.js'

let productManager = new ProductManager();

const productRouter = Router();

productRouter.get("/", async (req, res) => {
    try{
        let products = await productManager.getProducts()
        let type = req.query.type;
        let limit = req.query.limit;
        if(limit){
            res.send(await products.slice(0, limit));
            return;
        }
        if(!type || (type !== "pc" && type !== "phone" && type !== "celular" && type !== "computadora")) { 
            res.send(products)
        } else {
            let productsFilter = products.filter(element => element.type === type);
            res.send (productsFilter);
        }
    } catch(error){
        console.log(error)
    }
})

productRouter.get("/:pid" , async (req, res)=> {
    try {
        let products = await productManager.getProducts()
        let productID = products.find((element) => {
            return element.id == req.params.pid
        });
        res.send(productID);
    } catch (e){
        console.log(e);
    }
});

//en este post, lo unico que falta es agregarle al producto, que se agregue desde el body, una id autoincrementable, como todos los demas productos.
productRouter.post("/", async (req, res) => {
    try {
        let addedProduct = req.body;
		res.status(201).send(await productManager.pushProducts(addedProduct));
    } catch (error) {
        console.log(error);
    }
});
        /*
        let products = await productManager.getProducts()
        let arrayProducts = []
        const addedProducts = req.body;
        arrayProducts.push(addedProducts)
        arrayProducts.push(products)
        //fs.writeFileSync(productManager.path, 'utf-8')
        res.status(201).send(products)*/
export {productRouter};