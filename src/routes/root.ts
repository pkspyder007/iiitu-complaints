import { Router } from "express";

const rootRouter = Router();

rootRouter.get('/', async (req, res) => {
    try {
        res.send("HOME");
    } catch (error: any) {
        res.status(501).json({
            message: error.message
        });
    }
});

export default rootRouter;