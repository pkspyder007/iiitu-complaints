import { Router } from "express";
import { checkAuth } from "../middlewares/auth";
import { autoLogin, login, logout, verifyEmail } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/auth/login", login);

authRouter.post("/auth/logout", logout);

authRouter.get(
  "/auth/verifyEmail/:userId/:token",
  verifyEmail
);

authRouter.get("/auth/autoLogin", checkAuth, autoLogin);

export default authRouter;
