import { Router } from "express";
import CartManager from "../controllers/cartManager.js";

const cartRouter = Router();
const cartManager = new CartManager();

cartRouter.post('/',async (req, res) => {
    try {
        await cartManager.addCart(req.body)
        res.status(201).send(await cartManager.getCart())
    } catch (e) {
        res.status(400).send({e});
    }
})

cartRouter.get('/:cid', async (req, res) => {
    try {
        let cart = await cartManager.getCart();
        let cartId = cart.find((element) => {
            return element.id == req.params.cid});
        res.status(200).send(cartId);
    } catch (e) {
        res.status(400).send({e});
    }
})

cartRouter.post('/:cid/products/:pid' , async (req, res) => {
    try {
        let product = {
            id: req.params.pid
        }
        await cartManager.addCart(req.params.cid, product)
        res.status(201).send(await cartManager.getCart())
    } catch (e) {
        res.status(400).send({e});
    }
})

export {cartRouter};