import { Router } from "express";
import { createUser, getUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/users', createUser);

userRouter.get("/users/:id", getUser);

export default userRouter;