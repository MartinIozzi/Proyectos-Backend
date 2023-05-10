import express, { Router } from "express";
import CartManager from "../controllers/cartManager.js";

const cartRouter = Router();
const cartManager = new CartManager();

cartRouter.post('/',async (req, res) => {
    try {
        res.status(200).send(await cartManager.addProductToCart())
    } catch (e) {
        res.status(400).send({e});
    }
})

export {cartRouter};