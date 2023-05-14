import { Router } from "express";

const viewsRouter = Router()

viewsRouter.get ('/a', (req, res) => {
    res.render('index');
})

export default viewsRouter;