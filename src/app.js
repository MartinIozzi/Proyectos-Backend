import express from "express";
import { productRouter } from "./routers/productRouter.js";
import { cartRouter } from "./routers/cartRouter.js";

const app = express();

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}));

const port = 8080;


//haciendo el productRouter metodo post, seguir viendo
app.use('/api/products', productRouter);

app.use('/api/carts', cartRouter);

app.listen(8080, console.log(`Listening Port: ${port}`));